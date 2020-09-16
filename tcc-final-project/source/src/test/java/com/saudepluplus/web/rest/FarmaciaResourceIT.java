package com.saudepluplus.web.rest;

import com.saudepluplus.SaudepluplusApp;
import com.saudepluplus.domain.Farmacia;
import com.saudepluplus.repository.FarmaciaRepository;

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
 * Integration tests for the {@link FarmaciaResource} REST controller.
 */
@SpringBootTest(classes = SaudepluplusApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class FarmaciaResourceIT {

    private static final String DEFAULT_U_UID = "AAAAAAAAAA";
    private static final String UPDATED_U_UID = "BBBBBBBBBB";

    @Autowired
    private FarmaciaRepository farmaciaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFarmaciaMockMvc;

    private Farmacia farmacia;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Farmacia createEntity(EntityManager em) {
        Farmacia farmacia = new Farmacia()
            .uUID(DEFAULT_U_UID);
        return farmacia;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Farmacia createUpdatedEntity(EntityManager em) {
        Farmacia farmacia = new Farmacia()
            .uUID(UPDATED_U_UID);
        return farmacia;
    }

    @BeforeEach
    public void initTest() {
        farmacia = createEntity(em);
    }

    @Test
    @Transactional
    public void createFarmacia() throws Exception {
        int databaseSizeBeforeCreate = farmaciaRepository.findAll().size();
        // Create the Farmacia
        restFarmaciaMockMvc.perform(post("/api/farmacias").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(farmacia)))
            .andExpect(status().isCreated());

        // Validate the Farmacia in the database
        List<Farmacia> farmaciaList = farmaciaRepository.findAll();
        assertThat(farmaciaList).hasSize(databaseSizeBeforeCreate + 1);
        Farmacia testFarmacia = farmaciaList.get(farmaciaList.size() - 1);
        assertThat(testFarmacia.getuUID()).isEqualTo(DEFAULT_U_UID);
    }

    @Test
    @Transactional
    public void createFarmaciaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = farmaciaRepository.findAll().size();

        // Create the Farmacia with an existing ID
        farmacia.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFarmaciaMockMvc.perform(post("/api/farmacias").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(farmacia)))
            .andExpect(status().isBadRequest());

        // Validate the Farmacia in the database
        List<Farmacia> farmaciaList = farmaciaRepository.findAll();
        assertThat(farmaciaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFarmacias() throws Exception {
        // Initialize the database
        farmaciaRepository.saveAndFlush(farmacia);

        // Get all the farmaciaList
        restFarmaciaMockMvc.perform(get("/api/farmacias?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(farmacia.getId().intValue())))
            .andExpect(jsonPath("$.[*].uUID").value(hasItem(DEFAULT_U_UID)));
    }
    
    @Test
    @Transactional
    public void getFarmacia() throws Exception {
        // Initialize the database
        farmaciaRepository.saveAndFlush(farmacia);

        // Get the farmacia
        restFarmaciaMockMvc.perform(get("/api/farmacias/{id}", farmacia.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(farmacia.getId().intValue()))
            .andExpect(jsonPath("$.uUID").value(DEFAULT_U_UID));
    }
    @Test
    @Transactional
    public void getNonExistingFarmacia() throws Exception {
        // Get the farmacia
        restFarmaciaMockMvc.perform(get("/api/farmacias/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFarmacia() throws Exception {
        // Initialize the database
        farmaciaRepository.saveAndFlush(farmacia);

        int databaseSizeBeforeUpdate = farmaciaRepository.findAll().size();

        // Update the farmacia
        Farmacia updatedFarmacia = farmaciaRepository.findById(farmacia.getId()).get();
        // Disconnect from session so that the updates on updatedFarmacia are not directly saved in db
        em.detach(updatedFarmacia);
        updatedFarmacia
            .uUID(UPDATED_U_UID);

        restFarmaciaMockMvc.perform(put("/api/farmacias").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFarmacia)))
            .andExpect(status().isOk());

        // Validate the Farmacia in the database
        List<Farmacia> farmaciaList = farmaciaRepository.findAll();
        assertThat(farmaciaList).hasSize(databaseSizeBeforeUpdate);
        Farmacia testFarmacia = farmaciaList.get(farmaciaList.size() - 1);
        assertThat(testFarmacia.getuUID()).isEqualTo(UPDATED_U_UID);
    }

    @Test
    @Transactional
    public void updateNonExistingFarmacia() throws Exception {
        int databaseSizeBeforeUpdate = farmaciaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFarmaciaMockMvc.perform(put("/api/farmacias").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(farmacia)))
            .andExpect(status().isBadRequest());

        // Validate the Farmacia in the database
        List<Farmacia> farmaciaList = farmaciaRepository.findAll();
        assertThat(farmaciaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFarmacia() throws Exception {
        // Initialize the database
        farmaciaRepository.saveAndFlush(farmacia);

        int databaseSizeBeforeDelete = farmaciaRepository.findAll().size();

        // Delete the farmacia
        restFarmaciaMockMvc.perform(delete("/api/farmacias/{id}", farmacia.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Farmacia> farmaciaList = farmaciaRepository.findAll();
        assertThat(farmaciaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
