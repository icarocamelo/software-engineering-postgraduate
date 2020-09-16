package com.saudepluplus.web.rest;

import com.saudepluplus.SaudepluplusApp;
import com.saudepluplus.domain.Enfermeiro;
import com.saudepluplus.repository.EnfermeiroRepository;

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
 * Integration tests for the {@link EnfermeiroResource} REST controller.
 */
@SpringBootTest(classes = SaudepluplusApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EnfermeiroResourceIT {

    @Autowired
    private EnfermeiroRepository enfermeiroRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEnfermeiroMockMvc;

    private Enfermeiro enfermeiro;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Enfermeiro createEntity(EntityManager em) {
        Enfermeiro enfermeiro = new Enfermeiro();
        return enfermeiro;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Enfermeiro createUpdatedEntity(EntityManager em) {
        Enfermeiro enfermeiro = new Enfermeiro();
        return enfermeiro;
    }

    @BeforeEach
    public void initTest() {
        enfermeiro = createEntity(em);
    }

    @Test
    @Transactional
    public void createEnfermeiro() throws Exception {
        int databaseSizeBeforeCreate = enfermeiroRepository.findAll().size();
        // Create the Enfermeiro
        restEnfermeiroMockMvc.perform(post("/api/enfermeiros").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(enfermeiro)))
            .andExpect(status().isCreated());

        // Validate the Enfermeiro in the database
        List<Enfermeiro> enfermeiroList = enfermeiroRepository.findAll();
        assertThat(enfermeiroList).hasSize(databaseSizeBeforeCreate + 1);
        Enfermeiro testEnfermeiro = enfermeiroList.get(enfermeiroList.size() - 1);
    }

    @Test
    @Transactional
    public void createEnfermeiroWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = enfermeiroRepository.findAll().size();

        // Create the Enfermeiro with an existing ID
        enfermeiro.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEnfermeiroMockMvc.perform(post("/api/enfermeiros").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(enfermeiro)))
            .andExpect(status().isBadRequest());

        // Validate the Enfermeiro in the database
        List<Enfermeiro> enfermeiroList = enfermeiroRepository.findAll();
        assertThat(enfermeiroList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEnfermeiros() throws Exception {
        // Initialize the database
        enfermeiroRepository.saveAndFlush(enfermeiro);

        // Get all the enfermeiroList
        restEnfermeiroMockMvc.perform(get("/api/enfermeiros?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(enfermeiro.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getEnfermeiro() throws Exception {
        // Initialize the database
        enfermeiroRepository.saveAndFlush(enfermeiro);

        // Get the enfermeiro
        restEnfermeiroMockMvc.perform(get("/api/enfermeiros/{id}", enfermeiro.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(enfermeiro.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingEnfermeiro() throws Exception {
        // Get the enfermeiro
        restEnfermeiroMockMvc.perform(get("/api/enfermeiros/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEnfermeiro() throws Exception {
        // Initialize the database
        enfermeiroRepository.saveAndFlush(enfermeiro);

        int databaseSizeBeforeUpdate = enfermeiroRepository.findAll().size();

        // Update the enfermeiro
        Enfermeiro updatedEnfermeiro = enfermeiroRepository.findById(enfermeiro.getId()).get();
        // Disconnect from session so that the updates on updatedEnfermeiro are not directly saved in db
        em.detach(updatedEnfermeiro);

        restEnfermeiroMockMvc.perform(put("/api/enfermeiros").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEnfermeiro)))
            .andExpect(status().isOk());

        // Validate the Enfermeiro in the database
        List<Enfermeiro> enfermeiroList = enfermeiroRepository.findAll();
        assertThat(enfermeiroList).hasSize(databaseSizeBeforeUpdate);
        Enfermeiro testEnfermeiro = enfermeiroList.get(enfermeiroList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingEnfermeiro() throws Exception {
        int databaseSizeBeforeUpdate = enfermeiroRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEnfermeiroMockMvc.perform(put("/api/enfermeiros").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(enfermeiro)))
            .andExpect(status().isBadRequest());

        // Validate the Enfermeiro in the database
        List<Enfermeiro> enfermeiroList = enfermeiroRepository.findAll();
        assertThat(enfermeiroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEnfermeiro() throws Exception {
        // Initialize the database
        enfermeiroRepository.saveAndFlush(enfermeiro);

        int databaseSizeBeforeDelete = enfermeiroRepository.findAll().size();

        // Delete the enfermeiro
        restEnfermeiroMockMvc.perform(delete("/api/enfermeiros/{id}", enfermeiro.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Enfermeiro> enfermeiroList = enfermeiroRepository.findAll();
        assertThat(enfermeiroList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
