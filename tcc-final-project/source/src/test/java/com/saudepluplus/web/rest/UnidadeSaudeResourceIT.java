package com.saudepluplus.web.rest;

import com.saudepluplus.SaudepluplusApp;
import com.saudepluplus.domain.UnidadeSaude;
import com.saudepluplus.repository.UnidadeSaudeRepository;

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
 * Integration tests for the {@link UnidadeSaudeResource} REST controller.
 */
@SpringBootTest(classes = SaudepluplusApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class UnidadeSaudeResourceIT {

    @Autowired
    private UnidadeSaudeRepository unidadeSaudeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUnidadeSaudeMockMvc;

    private UnidadeSaude unidadeSaude;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UnidadeSaude createEntity(EntityManager em) {
        UnidadeSaude unidadeSaude = new UnidadeSaude();
        return unidadeSaude;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UnidadeSaude createUpdatedEntity(EntityManager em) {
        UnidadeSaude unidadeSaude = new UnidadeSaude();
        return unidadeSaude;
    }

    @BeforeEach
    public void initTest() {
        unidadeSaude = createEntity(em);
    }

    @Test
    @Transactional
    public void createUnidadeSaude() throws Exception {
        int databaseSizeBeforeCreate = unidadeSaudeRepository.findAll().size();
        // Create the UnidadeSaude
        restUnidadeSaudeMockMvc.perform(post("/api/unidade-saudes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(unidadeSaude)))
            .andExpect(status().isCreated());

        // Validate the UnidadeSaude in the database
        List<UnidadeSaude> unidadeSaudeList = unidadeSaudeRepository.findAll();
        assertThat(unidadeSaudeList).hasSize(databaseSizeBeforeCreate + 1);
        UnidadeSaude testUnidadeSaude = unidadeSaudeList.get(unidadeSaudeList.size() - 1);
    }

    @Test
    @Transactional
    public void createUnidadeSaudeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = unidadeSaudeRepository.findAll().size();

        // Create the UnidadeSaude with an existing ID
        unidadeSaude.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUnidadeSaudeMockMvc.perform(post("/api/unidade-saudes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(unidadeSaude)))
            .andExpect(status().isBadRequest());

        // Validate the UnidadeSaude in the database
        List<UnidadeSaude> unidadeSaudeList = unidadeSaudeRepository.findAll();
        assertThat(unidadeSaudeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUnidadeSaudes() throws Exception {
        // Initialize the database
        unidadeSaudeRepository.saveAndFlush(unidadeSaude);

        // Get all the unidadeSaudeList
        restUnidadeSaudeMockMvc.perform(get("/api/unidade-saudes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(unidadeSaude.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getUnidadeSaude() throws Exception {
        // Initialize the database
        unidadeSaudeRepository.saveAndFlush(unidadeSaude);

        // Get the unidadeSaude
        restUnidadeSaudeMockMvc.perform(get("/api/unidade-saudes/{id}", unidadeSaude.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(unidadeSaude.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingUnidadeSaude() throws Exception {
        // Get the unidadeSaude
        restUnidadeSaudeMockMvc.perform(get("/api/unidade-saudes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUnidadeSaude() throws Exception {
        // Initialize the database
        unidadeSaudeRepository.saveAndFlush(unidadeSaude);

        int databaseSizeBeforeUpdate = unidadeSaudeRepository.findAll().size();

        // Update the unidadeSaude
        UnidadeSaude updatedUnidadeSaude = unidadeSaudeRepository.findById(unidadeSaude.getId()).get();
        // Disconnect from session so that the updates on updatedUnidadeSaude are not directly saved in db
        em.detach(updatedUnidadeSaude);

        restUnidadeSaudeMockMvc.perform(put("/api/unidade-saudes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedUnidadeSaude)))
            .andExpect(status().isOk());

        // Validate the UnidadeSaude in the database
        List<UnidadeSaude> unidadeSaudeList = unidadeSaudeRepository.findAll();
        assertThat(unidadeSaudeList).hasSize(databaseSizeBeforeUpdate);
        UnidadeSaude testUnidadeSaude = unidadeSaudeList.get(unidadeSaudeList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingUnidadeSaude() throws Exception {
        int databaseSizeBeforeUpdate = unidadeSaudeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUnidadeSaudeMockMvc.perform(put("/api/unidade-saudes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(unidadeSaude)))
            .andExpect(status().isBadRequest());

        // Validate the UnidadeSaude in the database
        List<UnidadeSaude> unidadeSaudeList = unidadeSaudeRepository.findAll();
        assertThat(unidadeSaudeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUnidadeSaude() throws Exception {
        // Initialize the database
        unidadeSaudeRepository.saveAndFlush(unidadeSaude);

        int databaseSizeBeforeDelete = unidadeSaudeRepository.findAll().size();

        // Delete the unidadeSaude
        restUnidadeSaudeMockMvc.perform(delete("/api/unidade-saudes/{id}", unidadeSaude.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UnidadeSaude> unidadeSaudeList = unidadeSaudeRepository.findAll();
        assertThat(unidadeSaudeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
