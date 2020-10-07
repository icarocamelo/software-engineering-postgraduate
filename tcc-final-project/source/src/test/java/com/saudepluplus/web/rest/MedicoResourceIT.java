package com.saudepluplus.web.rest;

import com.saudepluplus.SaudepluplusApp;
import com.saudepluplus.domain.Medico;
import com.saudepluplus.repository.MedicoRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link MedicoResource} REST controller.
 */
@SpringBootTest(classes = SaudepluplusApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class MedicoResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_R_G = "AAAAAAAAAA";
    private static final String UPDATED_R_G = "BBBBBBBBBB";

    private static final String DEFAULT_C_PF = "AAAAAAAAAA";
    private static final String UPDATED_C_PF = "BBBBBBBBBB";

    private static final String DEFAULT_NUMERO_REGISTRO = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_REGISTRO = "BBBBBBBBBB";

    @Autowired
    private MedicoRepository medicoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMedicoMockMvc;

    private Medico medico;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Medico createEntity(EntityManager em) {
        Medico medico = new Medico()
            .nome(DEFAULT_NOME)
            .rG(DEFAULT_R_G)
            .cPF(DEFAULT_C_PF)
            .numeroRegistro(DEFAULT_NUMERO_REGISTRO);
        return medico;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Medico createUpdatedEntity(EntityManager em) {
        Medico medico = new Medico()
            .nome(UPDATED_NOME)
            .rG(UPDATED_R_G)
            .cPF(UPDATED_C_PF)
            .numeroRegistro(UPDATED_NUMERO_REGISTRO);
        return medico;
    }

    @BeforeEach
    public void initTest() {
        medico = createEntity(em);
    }

    @Test
    @Transactional
    public void createMedico() throws Exception {
        int databaseSizeBeforeCreate = medicoRepository.findAll().size();
        // Create the Medico
        restMedicoMockMvc.perform(post("/api/medicos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medico)))
            .andExpect(status().isCreated());

        // Validate the Medico in the database
        List<Medico> medicoList = medicoRepository.findAll();
        assertThat(medicoList).hasSize(databaseSizeBeforeCreate + 1);
        Medico testMedico = medicoList.get(medicoList.size() - 1);
        assertThat(testMedico.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testMedico.getrG()).isEqualTo(DEFAULT_R_G);
        assertThat(testMedico.getcPF()).isEqualTo(DEFAULT_C_PF);
        assertThat(testMedico.getNumeroRegistro()).isEqualTo(DEFAULT_NUMERO_REGISTRO);
    }

    @Test
    @Transactional
    public void createMedicoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = medicoRepository.findAll().size();

        // Create the Medico with an existing ID
        medico.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedicoMockMvc.perform(post("/api/medicos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medico)))
            .andExpect(status().isBadRequest());

        // Validate the Medico in the database
        List<Medico> medicoList = medicoRepository.findAll();
        assertThat(medicoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMedicos() throws Exception {
        // Initialize the database
        medicoRepository.saveAndFlush(medico);

        // Get all the medicoList
        restMedicoMockMvc.perform(get("/api/medicos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medico.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].rG").value(hasItem(DEFAULT_R_G)))
            .andExpect(jsonPath("$.[*].cPF").value(hasItem(DEFAULT_C_PF)))
            .andExpect(jsonPath("$.[*].numeroRegistro").value(hasItem(DEFAULT_NUMERO_REGISTRO)));
    }
    
    @Test
    @Transactional
    public void getMedico() throws Exception {
        // Initialize the database
        medicoRepository.saveAndFlush(medico);

        // Get the medico
        restMedicoMockMvc.perform(get("/api/medicos/{id}", medico.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(medico.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.rG").value(DEFAULT_R_G))
            .andExpect(jsonPath("$.cPF").value(DEFAULT_C_PF))
            .andExpect(jsonPath("$.numeroRegistro").value(DEFAULT_NUMERO_REGISTRO));
    }
    @Test
    @Transactional
    public void getNonExistingMedico() throws Exception {
        // Get the medico
        restMedicoMockMvc.perform(get("/api/medicos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMedico() throws Exception {
        // Initialize the database
        medicoRepository.saveAndFlush(medico);

        int databaseSizeBeforeUpdate = medicoRepository.findAll().size();

        // Update the medico
        Medico updatedMedico = medicoRepository.findById(medico.getId()).get();
        // Disconnect from session so that the updates on updatedMedico are not directly saved in db
        em.detach(updatedMedico);
        updatedMedico
            .nome(UPDATED_NOME)
            .rG(UPDATED_R_G)
            .cPF(UPDATED_C_PF)
            .numeroRegistro(UPDATED_NUMERO_REGISTRO);

        restMedicoMockMvc.perform(put("/api/medicos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMedico)))
            .andExpect(status().isOk());

        // Validate the Medico in the database
        List<Medico> medicoList = medicoRepository.findAll();
        assertThat(medicoList).hasSize(databaseSizeBeforeUpdate);
        Medico testMedico = medicoList.get(medicoList.size() - 1);
        assertThat(testMedico.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testMedico.getrG()).isEqualTo(UPDATED_R_G);
        assertThat(testMedico.getcPF()).isEqualTo(UPDATED_C_PF);
        assertThat(testMedico.getNumeroRegistro()).isEqualTo(UPDATED_NUMERO_REGISTRO);
    }

    @Test
    @Transactional
    public void updateNonExistingMedico() throws Exception {
        int databaseSizeBeforeUpdate = medicoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedicoMockMvc.perform(put("/api/medicos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medico)))
            .andExpect(status().isBadRequest());

        // Validate the Medico in the database
        List<Medico> medicoList = medicoRepository.findAll();
        assertThat(medicoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMedico() throws Exception {
        // Initialize the database
        medicoRepository.saveAndFlush(medico);

        int databaseSizeBeforeDelete = medicoRepository.findAll().size();

        // Delete the medico
        restMedicoMockMvc.perform(delete("/api/medicos/{id}", medico.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Medico> medicoList = medicoRepository.findAll();
        assertThat(medicoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
