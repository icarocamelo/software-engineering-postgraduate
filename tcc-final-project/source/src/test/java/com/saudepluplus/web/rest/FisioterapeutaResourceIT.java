package com.saudepluplus.web.rest;

import com.saudepluplus.SaudepluplusApp;
import com.saudepluplus.domain.Fisioterapeuta;
import com.saudepluplus.repository.FisioterapeutaRepository;

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
 * Integration tests for the {@link FisioterapeutaResource} REST controller.
 */
@SpringBootTest(classes = SaudepluplusApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class FisioterapeutaResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_R_G = "AAAAAAAAAA";
    private static final String UPDATED_R_G = "BBBBBBBBBB";

    private static final String DEFAULT_C_PF = "AAAAAAAAAA";
    private static final String UPDATED_C_PF = "BBBBBBBBBB";

    private static final String DEFAULT_NUMERO_REGISTRO = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_REGISTRO = "BBBBBBBBBB";

    @Autowired
    private FisioterapeutaRepository fisioterapeutaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFisioterapeutaMockMvc;

    private Fisioterapeuta fisioterapeuta;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Fisioterapeuta createEntity(EntityManager em) {
        Fisioterapeuta fisioterapeuta = new Fisioterapeuta()
            .nome(DEFAULT_NOME)
            .rG(DEFAULT_R_G)
            .cPF(DEFAULT_C_PF)
            .numeroRegistro(DEFAULT_NUMERO_REGISTRO);
        return fisioterapeuta;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Fisioterapeuta createUpdatedEntity(EntityManager em) {
        Fisioterapeuta fisioterapeuta = new Fisioterapeuta()
            .nome(UPDATED_NOME)
            .rG(UPDATED_R_G)
            .cPF(UPDATED_C_PF)
            .numeroRegistro(UPDATED_NUMERO_REGISTRO);
        return fisioterapeuta;
    }

    @BeforeEach
    public void initTest() {
        fisioterapeuta = createEntity(em);
    }

    @Test
    @Transactional
    public void createFisioterapeuta() throws Exception {
        int databaseSizeBeforeCreate = fisioterapeutaRepository.findAll().size();
        // Create the Fisioterapeuta
        restFisioterapeutaMockMvc.perform(post("/api/fisioterapeutas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fisioterapeuta)))
            .andExpect(status().isCreated());

        // Validate the Fisioterapeuta in the database
        List<Fisioterapeuta> fisioterapeutaList = fisioterapeutaRepository.findAll();
        assertThat(fisioterapeutaList).hasSize(databaseSizeBeforeCreate + 1);
        Fisioterapeuta testFisioterapeuta = fisioterapeutaList.get(fisioterapeutaList.size() - 1);
        assertThat(testFisioterapeuta.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testFisioterapeuta.getrG()).isEqualTo(DEFAULT_R_G);
        assertThat(testFisioterapeuta.getcPF()).isEqualTo(DEFAULT_C_PF);
        assertThat(testFisioterapeuta.getNumeroRegistro()).isEqualTo(DEFAULT_NUMERO_REGISTRO);
    }

    @Test
    @Transactional
    public void createFisioterapeutaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fisioterapeutaRepository.findAll().size();

        // Create the Fisioterapeuta with an existing ID
        fisioterapeuta.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFisioterapeutaMockMvc.perform(post("/api/fisioterapeutas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fisioterapeuta)))
            .andExpect(status().isBadRequest());

        // Validate the Fisioterapeuta in the database
        List<Fisioterapeuta> fisioterapeutaList = fisioterapeutaRepository.findAll();
        assertThat(fisioterapeutaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFisioterapeutas() throws Exception {
        // Initialize the database
        fisioterapeutaRepository.saveAndFlush(fisioterapeuta);

        // Get all the fisioterapeutaList
        restFisioterapeutaMockMvc.perform(get("/api/fisioterapeutas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fisioterapeuta.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].rG").value(hasItem(DEFAULT_R_G)))
            .andExpect(jsonPath("$.[*].cPF").value(hasItem(DEFAULT_C_PF)))
            .andExpect(jsonPath("$.[*].numeroRegistro").value(hasItem(DEFAULT_NUMERO_REGISTRO)));
    }
    
    @Test
    @Transactional
    public void getFisioterapeuta() throws Exception {
        // Initialize the database
        fisioterapeutaRepository.saveAndFlush(fisioterapeuta);

        // Get the fisioterapeuta
        restFisioterapeutaMockMvc.perform(get("/api/fisioterapeutas/{id}", fisioterapeuta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(fisioterapeuta.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.rG").value(DEFAULT_R_G))
            .andExpect(jsonPath("$.cPF").value(DEFAULT_C_PF))
            .andExpect(jsonPath("$.numeroRegistro").value(DEFAULT_NUMERO_REGISTRO));
    }
    @Test
    @Transactional
    public void getNonExistingFisioterapeuta() throws Exception {
        // Get the fisioterapeuta
        restFisioterapeutaMockMvc.perform(get("/api/fisioterapeutas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFisioterapeuta() throws Exception {
        // Initialize the database
        fisioterapeutaRepository.saveAndFlush(fisioterapeuta);

        int databaseSizeBeforeUpdate = fisioterapeutaRepository.findAll().size();

        // Update the fisioterapeuta
        Fisioterapeuta updatedFisioterapeuta = fisioterapeutaRepository.findById(fisioterapeuta.getId()).get();
        // Disconnect from session so that the updates on updatedFisioterapeuta are not directly saved in db
        em.detach(updatedFisioterapeuta);
        updatedFisioterapeuta
            .nome(UPDATED_NOME)
            .rG(UPDATED_R_G)
            .cPF(UPDATED_C_PF)
            .numeroRegistro(UPDATED_NUMERO_REGISTRO);

        restFisioterapeutaMockMvc.perform(put("/api/fisioterapeutas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFisioterapeuta)))
            .andExpect(status().isOk());

        // Validate the Fisioterapeuta in the database
        List<Fisioterapeuta> fisioterapeutaList = fisioterapeutaRepository.findAll();
        assertThat(fisioterapeutaList).hasSize(databaseSizeBeforeUpdate);
        Fisioterapeuta testFisioterapeuta = fisioterapeutaList.get(fisioterapeutaList.size() - 1);
        assertThat(testFisioterapeuta.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testFisioterapeuta.getrG()).isEqualTo(UPDATED_R_G);
        assertThat(testFisioterapeuta.getcPF()).isEqualTo(UPDATED_C_PF);
        assertThat(testFisioterapeuta.getNumeroRegistro()).isEqualTo(UPDATED_NUMERO_REGISTRO);
    }

    @Test
    @Transactional
    public void updateNonExistingFisioterapeuta() throws Exception {
        int databaseSizeBeforeUpdate = fisioterapeutaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFisioterapeutaMockMvc.perform(put("/api/fisioterapeutas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fisioterapeuta)))
            .andExpect(status().isBadRequest());

        // Validate the Fisioterapeuta in the database
        List<Fisioterapeuta> fisioterapeutaList = fisioterapeutaRepository.findAll();
        assertThat(fisioterapeutaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFisioterapeuta() throws Exception {
        // Initialize the database
        fisioterapeutaRepository.saveAndFlush(fisioterapeuta);

        int databaseSizeBeforeDelete = fisioterapeutaRepository.findAll().size();

        // Delete the fisioterapeuta
        restFisioterapeutaMockMvc.perform(delete("/api/fisioterapeutas/{id}", fisioterapeuta.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Fisioterapeuta> fisioterapeutaList = fisioterapeutaRepository.findAll();
        assertThat(fisioterapeutaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
