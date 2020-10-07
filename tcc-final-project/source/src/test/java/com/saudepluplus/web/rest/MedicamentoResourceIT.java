package com.saudepluplus.web.rest;

import com.saudepluplus.SaudepluplusApp;
import com.saudepluplus.domain.Medicamento;
import com.saudepluplus.repository.MedicamentoRepository;

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
 * Integration tests for the {@link MedicamentoResource} REST controller.
 */
@SpringBootTest(classes = SaudepluplusApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class MedicamentoResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private MedicamentoRepository medicamentoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restMedicamentoMockMvc;

    private Medicamento medicamento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Medicamento createEntity(EntityManager em) {
        Medicamento medicamento = new Medicamento()
            .nome(DEFAULT_NOME);
        return medicamento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Medicamento createUpdatedEntity(EntityManager em) {
        Medicamento medicamento = new Medicamento()
            .nome(UPDATED_NOME);
        return medicamento;
    }

    @BeforeEach
    public void initTest() {
        medicamento = createEntity(em);
    }

    @Test
    @Transactional
    public void createMedicamento() throws Exception {
        int databaseSizeBeforeCreate = medicamentoRepository.findAll().size();
        // Create the Medicamento
        restMedicamentoMockMvc.perform(post("/api/medicamentos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicamento)))
            .andExpect(status().isCreated());

        // Validate the Medicamento in the database
        List<Medicamento> medicamentoList = medicamentoRepository.findAll();
        assertThat(medicamentoList).hasSize(databaseSizeBeforeCreate + 1);
        Medicamento testMedicamento = medicamentoList.get(medicamentoList.size() - 1);
        assertThat(testMedicamento.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createMedicamentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = medicamentoRepository.findAll().size();

        // Create the Medicamento with an existing ID
        medicamento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMedicamentoMockMvc.perform(post("/api/medicamentos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicamento)))
            .andExpect(status().isBadRequest());

        // Validate the Medicamento in the database
        List<Medicamento> medicamentoList = medicamentoRepository.findAll();
        assertThat(medicamentoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMedicamentos() throws Exception {
        // Initialize the database
        medicamentoRepository.saveAndFlush(medicamento);

        // Get all the medicamentoList
        restMedicamentoMockMvc.perform(get("/api/medicamentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(medicamento.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)));
    }
    
    @Test
    @Transactional
    public void getMedicamento() throws Exception {
        // Initialize the database
        medicamentoRepository.saveAndFlush(medicamento);

        // Get the medicamento
        restMedicamentoMockMvc.perform(get("/api/medicamentos/{id}", medicamento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(medicamento.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME));
    }
    @Test
    @Transactional
    public void getNonExistingMedicamento() throws Exception {
        // Get the medicamento
        restMedicamentoMockMvc.perform(get("/api/medicamentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMedicamento() throws Exception {
        // Initialize the database
        medicamentoRepository.saveAndFlush(medicamento);

        int databaseSizeBeforeUpdate = medicamentoRepository.findAll().size();

        // Update the medicamento
        Medicamento updatedMedicamento = medicamentoRepository.findById(medicamento.getId()).get();
        // Disconnect from session so that the updates on updatedMedicamento are not directly saved in db
        em.detach(updatedMedicamento);
        updatedMedicamento
            .nome(UPDATED_NOME);

        restMedicamentoMockMvc.perform(put("/api/medicamentos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedMedicamento)))
            .andExpect(status().isOk());

        // Validate the Medicamento in the database
        List<Medicamento> medicamentoList = medicamentoRepository.findAll();
        assertThat(medicamentoList).hasSize(databaseSizeBeforeUpdate);
        Medicamento testMedicamento = medicamentoList.get(medicamentoList.size() - 1);
        assertThat(testMedicamento.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingMedicamento() throws Exception {
        int databaseSizeBeforeUpdate = medicamentoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMedicamentoMockMvc.perform(put("/api/medicamentos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(medicamento)))
            .andExpect(status().isBadRequest());

        // Validate the Medicamento in the database
        List<Medicamento> medicamentoList = medicamentoRepository.findAll();
        assertThat(medicamentoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMedicamento() throws Exception {
        // Initialize the database
        medicamentoRepository.saveAndFlush(medicamento);

        int databaseSizeBeforeDelete = medicamentoRepository.findAll().size();

        // Delete the medicamento
        restMedicamentoMockMvc.perform(delete("/api/medicamentos/{id}", medicamento.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Medicamento> medicamentoList = medicamentoRepository.findAll();
        assertThat(medicamentoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
