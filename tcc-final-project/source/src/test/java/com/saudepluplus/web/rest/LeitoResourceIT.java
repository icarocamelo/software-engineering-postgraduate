package com.saudepluplus.web.rest;

import com.saudepluplus.SaudepluplusApp;
import com.saudepluplus.domain.Leito;
import com.saudepluplus.repository.LeitoRepository;

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
 * Integration tests for the {@link LeitoResource} REST controller.
 */
@SpringBootTest(classes = SaudepluplusApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class LeitoResourceIT {

    private static final String DEFAULT_U_UID = "AAAAAAAAAA";
    private static final String UPDATED_U_UID = "BBBBBBBBBB";

    @Autowired
    private LeitoRepository leitoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLeitoMockMvc;

    private Leito leito;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Leito createEntity(EntityManager em) {
        Leito leito = new Leito()
            .uUID(DEFAULT_U_UID);
        return leito;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Leito createUpdatedEntity(EntityManager em) {
        Leito leito = new Leito()
            .uUID(UPDATED_U_UID);
        return leito;
    }

    @BeforeEach
    public void initTest() {
        leito = createEntity(em);
    }

    @Test
    @Transactional
    public void createLeito() throws Exception {
        int databaseSizeBeforeCreate = leitoRepository.findAll().size();
        // Create the Leito
        restLeitoMockMvc.perform(post("/api/leitos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(leito)))
            .andExpect(status().isCreated());

        // Validate the Leito in the database
        List<Leito> leitoList = leitoRepository.findAll();
        assertThat(leitoList).hasSize(databaseSizeBeforeCreate + 1);
        Leito testLeito = leitoList.get(leitoList.size() - 1);
        assertThat(testLeito.getuUID()).isEqualTo(DEFAULT_U_UID);
    }

    @Test
    @Transactional
    public void createLeitoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = leitoRepository.findAll().size();

        // Create the Leito with an existing ID
        leito.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLeitoMockMvc.perform(post("/api/leitos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(leito)))
            .andExpect(status().isBadRequest());

        // Validate the Leito in the database
        List<Leito> leitoList = leitoRepository.findAll();
        assertThat(leitoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllLeitos() throws Exception {
        // Initialize the database
        leitoRepository.saveAndFlush(leito);

        // Get all the leitoList
        restLeitoMockMvc.perform(get("/api/leitos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(leito.getId().intValue())))
            .andExpect(jsonPath("$.[*].uUID").value(hasItem(DEFAULT_U_UID)));
    }
    
    @Test
    @Transactional
    public void getLeito() throws Exception {
        // Initialize the database
        leitoRepository.saveAndFlush(leito);

        // Get the leito
        restLeitoMockMvc.perform(get("/api/leitos/{id}", leito.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(leito.getId().intValue()))
            .andExpect(jsonPath("$.uUID").value(DEFAULT_U_UID));
    }
    @Test
    @Transactional
    public void getNonExistingLeito() throws Exception {
        // Get the leito
        restLeitoMockMvc.perform(get("/api/leitos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLeito() throws Exception {
        // Initialize the database
        leitoRepository.saveAndFlush(leito);

        int databaseSizeBeforeUpdate = leitoRepository.findAll().size();

        // Update the leito
        Leito updatedLeito = leitoRepository.findById(leito.getId()).get();
        // Disconnect from session so that the updates on updatedLeito are not directly saved in db
        em.detach(updatedLeito);
        updatedLeito
            .uUID(UPDATED_U_UID);

        restLeitoMockMvc.perform(put("/api/leitos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLeito)))
            .andExpect(status().isOk());

        // Validate the Leito in the database
        List<Leito> leitoList = leitoRepository.findAll();
        assertThat(leitoList).hasSize(databaseSizeBeforeUpdate);
        Leito testLeito = leitoList.get(leitoList.size() - 1);
        assertThat(testLeito.getuUID()).isEqualTo(UPDATED_U_UID);
    }

    @Test
    @Transactional
    public void updateNonExistingLeito() throws Exception {
        int databaseSizeBeforeUpdate = leitoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLeitoMockMvc.perform(put("/api/leitos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(leito)))
            .andExpect(status().isBadRequest());

        // Validate the Leito in the database
        List<Leito> leitoList = leitoRepository.findAll();
        assertThat(leitoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLeito() throws Exception {
        // Initialize the database
        leitoRepository.saveAndFlush(leito);

        int databaseSizeBeforeDelete = leitoRepository.findAll().size();

        // Delete the leito
        restLeitoMockMvc.perform(delete("/api/leitos/{id}", leito.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Leito> leitoList = leitoRepository.findAll();
        assertThat(leitoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
