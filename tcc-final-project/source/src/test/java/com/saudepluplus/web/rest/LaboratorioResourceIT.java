package com.saudepluplus.web.rest;

import com.saudepluplus.SaudepluplusApp;
import com.saudepluplus.domain.Laboratorio;
import com.saudepluplus.repository.LaboratorioRepository;

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
 * Integration tests for the {@link LaboratorioResource} REST controller.
 */
@SpringBootTest(classes = SaudepluplusApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class LaboratorioResourceIT {

    @Autowired
    private LaboratorioRepository laboratorioRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLaboratorioMockMvc;

    private Laboratorio laboratorio;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Laboratorio createEntity(EntityManager em) {
        Laboratorio laboratorio = new Laboratorio();
        return laboratorio;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Laboratorio createUpdatedEntity(EntityManager em) {
        Laboratorio laboratorio = new Laboratorio();
        return laboratorio;
    }

    @BeforeEach
    public void initTest() {
        laboratorio = createEntity(em);
    }

    @Test
    @Transactional
    public void createLaboratorio() throws Exception {
        int databaseSizeBeforeCreate = laboratorioRepository.findAll().size();
        // Create the Laboratorio
        restLaboratorioMockMvc.perform(post("/api/laboratorios").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(laboratorio)))
            .andExpect(status().isCreated());

        // Validate the Laboratorio in the database
        List<Laboratorio> laboratorioList = laboratorioRepository.findAll();
        assertThat(laboratorioList).hasSize(databaseSizeBeforeCreate + 1);
        Laboratorio testLaboratorio = laboratorioList.get(laboratorioList.size() - 1);
    }

    @Test
    @Transactional
    public void createLaboratorioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = laboratorioRepository.findAll().size();

        // Create the Laboratorio with an existing ID
        laboratorio.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLaboratorioMockMvc.perform(post("/api/laboratorios").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(laboratorio)))
            .andExpect(status().isBadRequest());

        // Validate the Laboratorio in the database
        List<Laboratorio> laboratorioList = laboratorioRepository.findAll();
        assertThat(laboratorioList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllLaboratorios() throws Exception {
        // Initialize the database
        laboratorioRepository.saveAndFlush(laboratorio);

        // Get all the laboratorioList
        restLaboratorioMockMvc.perform(get("/api/laboratorios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(laboratorio.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getLaboratorio() throws Exception {
        // Initialize the database
        laboratorioRepository.saveAndFlush(laboratorio);

        // Get the laboratorio
        restLaboratorioMockMvc.perform(get("/api/laboratorios/{id}", laboratorio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(laboratorio.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingLaboratorio() throws Exception {
        // Get the laboratorio
        restLaboratorioMockMvc.perform(get("/api/laboratorios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLaboratorio() throws Exception {
        // Initialize the database
        laboratorioRepository.saveAndFlush(laboratorio);

        int databaseSizeBeforeUpdate = laboratorioRepository.findAll().size();

        // Update the laboratorio
        Laboratorio updatedLaboratorio = laboratorioRepository.findById(laboratorio.getId()).get();
        // Disconnect from session so that the updates on updatedLaboratorio are not directly saved in db
        em.detach(updatedLaboratorio);

        restLaboratorioMockMvc.perform(put("/api/laboratorios").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLaboratorio)))
            .andExpect(status().isOk());

        // Validate the Laboratorio in the database
        List<Laboratorio> laboratorioList = laboratorioRepository.findAll();
        assertThat(laboratorioList).hasSize(databaseSizeBeforeUpdate);
        Laboratorio testLaboratorio = laboratorioList.get(laboratorioList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingLaboratorio() throws Exception {
        int databaseSizeBeforeUpdate = laboratorioRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLaboratorioMockMvc.perform(put("/api/laboratorios").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(laboratorio)))
            .andExpect(status().isBadRequest());

        // Validate the Laboratorio in the database
        List<Laboratorio> laboratorioList = laboratorioRepository.findAll();
        assertThat(laboratorioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLaboratorio() throws Exception {
        // Initialize the database
        laboratorioRepository.saveAndFlush(laboratorio);

        int databaseSizeBeforeDelete = laboratorioRepository.findAll().size();

        // Delete the laboratorio
        restLaboratorioMockMvc.perform(delete("/api/laboratorios/{id}", laboratorio.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Laboratorio> laboratorioList = laboratorioRepository.findAll();
        assertThat(laboratorioList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
