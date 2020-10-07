package com.saudepluplus.web.rest;

import com.saudepluplus.SaudepluplusApp;
import com.saudepluplus.domain.ProfissionalDeSaude;
import com.saudepluplus.repository.ProfissionalDeSaudeRepository;

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
 * Integration tests for the {@link ProfissionalDeSaudeResource} REST controller.
 */
@SpringBootTest(classes = SaudepluplusApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProfissionalDeSaudeResourceIT {

    @Autowired
    private ProfissionalDeSaudeRepository profissionalDeSaudeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProfissionalDeSaudeMockMvc;

    private ProfissionalDeSaude profissionalDeSaude;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProfissionalDeSaude createEntity(EntityManager em) {
        ProfissionalDeSaude profissionalDeSaude = new ProfissionalDeSaude();
        return profissionalDeSaude;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProfissionalDeSaude createUpdatedEntity(EntityManager em) {
        ProfissionalDeSaude profissionalDeSaude = new ProfissionalDeSaude();
        return profissionalDeSaude;
    }

    @BeforeEach
    public void initTest() {
        profissionalDeSaude = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfissionalDeSaude() throws Exception {
        int databaseSizeBeforeCreate = profissionalDeSaudeRepository.findAll().size();
        // Create the ProfissionalDeSaude
        restProfissionalDeSaudeMockMvc.perform(post("/api/profissional-de-saudes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profissionalDeSaude)))
            .andExpect(status().isCreated());

        // Validate the ProfissionalDeSaude in the database
        List<ProfissionalDeSaude> profissionalDeSaudeList = profissionalDeSaudeRepository.findAll();
        assertThat(profissionalDeSaudeList).hasSize(databaseSizeBeforeCreate + 1);
        ProfissionalDeSaude testProfissionalDeSaude = profissionalDeSaudeList.get(profissionalDeSaudeList.size() - 1);
    }

    @Test
    @Transactional
    public void createProfissionalDeSaudeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = profissionalDeSaudeRepository.findAll().size();

        // Create the ProfissionalDeSaude with an existing ID
        profissionalDeSaude.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfissionalDeSaudeMockMvc.perform(post("/api/profissional-de-saudes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profissionalDeSaude)))
            .andExpect(status().isBadRequest());

        // Validate the ProfissionalDeSaude in the database
        List<ProfissionalDeSaude> profissionalDeSaudeList = profissionalDeSaudeRepository.findAll();
        assertThat(profissionalDeSaudeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProfissionalDeSaudes() throws Exception {
        // Initialize the database
        profissionalDeSaudeRepository.saveAndFlush(profissionalDeSaude);

        // Get all the profissionalDeSaudeList
        restProfissionalDeSaudeMockMvc.perform(get("/api/profissional-de-saudes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(profissionalDeSaude.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getProfissionalDeSaude() throws Exception {
        // Initialize the database
        profissionalDeSaudeRepository.saveAndFlush(profissionalDeSaude);

        // Get the profissionalDeSaude
        restProfissionalDeSaudeMockMvc.perform(get("/api/profissional-de-saudes/{id}", profissionalDeSaude.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(profissionalDeSaude.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingProfissionalDeSaude() throws Exception {
        // Get the profissionalDeSaude
        restProfissionalDeSaudeMockMvc.perform(get("/api/profissional-de-saudes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfissionalDeSaude() throws Exception {
        // Initialize the database
        profissionalDeSaudeRepository.saveAndFlush(profissionalDeSaude);

        int databaseSizeBeforeUpdate = profissionalDeSaudeRepository.findAll().size();

        // Update the profissionalDeSaude
        ProfissionalDeSaude updatedProfissionalDeSaude = profissionalDeSaudeRepository.findById(profissionalDeSaude.getId()).get();
        // Disconnect from session so that the updates on updatedProfissionalDeSaude are not directly saved in db
        em.detach(updatedProfissionalDeSaude);

        restProfissionalDeSaudeMockMvc.perform(put("/api/profissional-de-saudes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProfissionalDeSaude)))
            .andExpect(status().isOk());

        // Validate the ProfissionalDeSaude in the database
        List<ProfissionalDeSaude> profissionalDeSaudeList = profissionalDeSaudeRepository.findAll();
        assertThat(profissionalDeSaudeList).hasSize(databaseSizeBeforeUpdate);
        ProfissionalDeSaude testProfissionalDeSaude = profissionalDeSaudeList.get(profissionalDeSaudeList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingProfissionalDeSaude() throws Exception {
        int databaseSizeBeforeUpdate = profissionalDeSaudeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProfissionalDeSaudeMockMvc.perform(put("/api/profissional-de-saudes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profissionalDeSaude)))
            .andExpect(status().isBadRequest());

        // Validate the ProfissionalDeSaude in the database
        List<ProfissionalDeSaude> profissionalDeSaudeList = profissionalDeSaudeRepository.findAll();
        assertThat(profissionalDeSaudeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProfissionalDeSaude() throws Exception {
        // Initialize the database
        profissionalDeSaudeRepository.saveAndFlush(profissionalDeSaude);

        int databaseSizeBeforeDelete = profissionalDeSaudeRepository.findAll().size();

        // Delete the profissionalDeSaude
        restProfissionalDeSaudeMockMvc.perform(delete("/api/profissional-de-saudes/{id}", profissionalDeSaude.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProfissionalDeSaude> profissionalDeSaudeList = profissionalDeSaudeRepository.findAll();
        assertThat(profissionalDeSaudeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
