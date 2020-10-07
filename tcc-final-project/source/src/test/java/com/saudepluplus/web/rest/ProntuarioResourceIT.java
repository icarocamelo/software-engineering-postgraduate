package com.saudepluplus.web.rest;

import com.saudepluplus.SaudepluplusApp;
import com.saudepluplus.domain.Prontuario;
import com.saudepluplus.repository.ProntuarioRepository;

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
 * Integration tests for the {@link ProntuarioResource} REST controller.
 */
@SpringBootTest(classes = SaudepluplusApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProntuarioResourceIT {

    @Autowired
    private ProntuarioRepository prontuarioRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProntuarioMockMvc;

    private Prontuario prontuario;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Prontuario createEntity(EntityManager em) {
        Prontuario prontuario = new Prontuario();
        return prontuario;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Prontuario createUpdatedEntity(EntityManager em) {
        Prontuario prontuario = new Prontuario();
        return prontuario;
    }

    @BeforeEach
    public void initTest() {
        prontuario = createEntity(em);
    }

    @Test
    @Transactional
    public void createProntuario() throws Exception {
        int databaseSizeBeforeCreate = prontuarioRepository.findAll().size();
        // Create the Prontuario
        restProntuarioMockMvc.perform(post("/api/prontuarios").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prontuario)))
            .andExpect(status().isCreated());

        // Validate the Prontuario in the database
        List<Prontuario> prontuarioList = prontuarioRepository.findAll();
        assertThat(prontuarioList).hasSize(databaseSizeBeforeCreate + 1);
        Prontuario testProntuario = prontuarioList.get(prontuarioList.size() - 1);
    }

    @Test
    @Transactional
    public void createProntuarioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = prontuarioRepository.findAll().size();

        // Create the Prontuario with an existing ID
        prontuario.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProntuarioMockMvc.perform(post("/api/prontuarios").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prontuario)))
            .andExpect(status().isBadRequest());

        // Validate the Prontuario in the database
        List<Prontuario> prontuarioList = prontuarioRepository.findAll();
        assertThat(prontuarioList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProntuarios() throws Exception {
        // Initialize the database
        prontuarioRepository.saveAndFlush(prontuario);

        // Get all the prontuarioList
        restProntuarioMockMvc.perform(get("/api/prontuarios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(prontuario.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getProntuario() throws Exception {
        // Initialize the database
        prontuarioRepository.saveAndFlush(prontuario);

        // Get the prontuario
        restProntuarioMockMvc.perform(get("/api/prontuarios/{id}", prontuario.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(prontuario.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingProntuario() throws Exception {
        // Get the prontuario
        restProntuarioMockMvc.perform(get("/api/prontuarios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProntuario() throws Exception {
        // Initialize the database
        prontuarioRepository.saveAndFlush(prontuario);

        int databaseSizeBeforeUpdate = prontuarioRepository.findAll().size();

        // Update the prontuario
        Prontuario updatedProntuario = prontuarioRepository.findById(prontuario.getId()).get();
        // Disconnect from session so that the updates on updatedProntuario are not directly saved in db
        em.detach(updatedProntuario);

        restProntuarioMockMvc.perform(put("/api/prontuarios").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProntuario)))
            .andExpect(status().isOk());

        // Validate the Prontuario in the database
        List<Prontuario> prontuarioList = prontuarioRepository.findAll();
        assertThat(prontuarioList).hasSize(databaseSizeBeforeUpdate);
        Prontuario testProntuario = prontuarioList.get(prontuarioList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingProntuario() throws Exception {
        int databaseSizeBeforeUpdate = prontuarioRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProntuarioMockMvc.perform(put("/api/prontuarios").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(prontuario)))
            .andExpect(status().isBadRequest());

        // Validate the Prontuario in the database
        List<Prontuario> prontuarioList = prontuarioRepository.findAll();
        assertThat(prontuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProntuario() throws Exception {
        // Initialize the database
        prontuarioRepository.saveAndFlush(prontuario);

        int databaseSizeBeforeDelete = prontuarioRepository.findAll().size();

        // Delete the prontuario
        restProntuarioMockMvc.perform(delete("/api/prontuarios/{id}", prontuario.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Prontuario> prontuarioList = prontuarioRepository.findAll();
        assertThat(prontuarioList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
