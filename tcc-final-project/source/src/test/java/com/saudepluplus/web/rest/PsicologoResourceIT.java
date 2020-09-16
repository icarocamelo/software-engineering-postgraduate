package com.saudepluplus.web.rest;

import com.saudepluplus.SaudepluplusApp;
import com.saudepluplus.domain.Psicologo;
import com.saudepluplus.repository.PsicologoRepository;

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
 * Integration tests for the {@link PsicologoResource} REST controller.
 */
@SpringBootTest(classes = SaudepluplusApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PsicologoResourceIT {

    @Autowired
    private PsicologoRepository psicologoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPsicologoMockMvc;

    private Psicologo psicologo;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Psicologo createEntity(EntityManager em) {
        Psicologo psicologo = new Psicologo();
        return psicologo;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Psicologo createUpdatedEntity(EntityManager em) {
        Psicologo psicologo = new Psicologo();
        return psicologo;
    }

    @BeforeEach
    public void initTest() {
        psicologo = createEntity(em);
    }

    @Test
    @Transactional
    public void createPsicologo() throws Exception {
        int databaseSizeBeforeCreate = psicologoRepository.findAll().size();
        // Create the Psicologo
        restPsicologoMockMvc.perform(post("/api/psicologos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(psicologo)))
            .andExpect(status().isCreated());

        // Validate the Psicologo in the database
        List<Psicologo> psicologoList = psicologoRepository.findAll();
        assertThat(psicologoList).hasSize(databaseSizeBeforeCreate + 1);
        Psicologo testPsicologo = psicologoList.get(psicologoList.size() - 1);
    }

    @Test
    @Transactional
    public void createPsicologoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = psicologoRepository.findAll().size();

        // Create the Psicologo with an existing ID
        psicologo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPsicologoMockMvc.perform(post("/api/psicologos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(psicologo)))
            .andExpect(status().isBadRequest());

        // Validate the Psicologo in the database
        List<Psicologo> psicologoList = psicologoRepository.findAll();
        assertThat(psicologoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPsicologos() throws Exception {
        // Initialize the database
        psicologoRepository.saveAndFlush(psicologo);

        // Get all the psicologoList
        restPsicologoMockMvc.perform(get("/api/psicologos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(psicologo.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getPsicologo() throws Exception {
        // Initialize the database
        psicologoRepository.saveAndFlush(psicologo);

        // Get the psicologo
        restPsicologoMockMvc.perform(get("/api/psicologos/{id}", psicologo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(psicologo.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingPsicologo() throws Exception {
        // Get the psicologo
        restPsicologoMockMvc.perform(get("/api/psicologos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePsicologo() throws Exception {
        // Initialize the database
        psicologoRepository.saveAndFlush(psicologo);

        int databaseSizeBeforeUpdate = psicologoRepository.findAll().size();

        // Update the psicologo
        Psicologo updatedPsicologo = psicologoRepository.findById(psicologo.getId()).get();
        // Disconnect from session so that the updates on updatedPsicologo are not directly saved in db
        em.detach(updatedPsicologo);

        restPsicologoMockMvc.perform(put("/api/psicologos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPsicologo)))
            .andExpect(status().isOk());

        // Validate the Psicologo in the database
        List<Psicologo> psicologoList = psicologoRepository.findAll();
        assertThat(psicologoList).hasSize(databaseSizeBeforeUpdate);
        Psicologo testPsicologo = psicologoList.get(psicologoList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingPsicologo() throws Exception {
        int databaseSizeBeforeUpdate = psicologoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPsicologoMockMvc.perform(put("/api/psicologos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(psicologo)))
            .andExpect(status().isBadRequest());

        // Validate the Psicologo in the database
        List<Psicologo> psicologoList = psicologoRepository.findAll();
        assertThat(psicologoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePsicologo() throws Exception {
        // Initialize the database
        psicologoRepository.saveAndFlush(psicologo);

        int databaseSizeBeforeDelete = psicologoRepository.findAll().size();

        // Delete the psicologo
        restPsicologoMockMvc.perform(delete("/api/psicologos/{id}", psicologo.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Psicologo> psicologoList = psicologoRepository.findAll();
        assertThat(psicologoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
