package com.saudepluplus.web.rest;

import com.saudepluplus.SaudepluplusApp;
import com.saudepluplus.domain.AgendaExame;
import com.saudepluplus.repository.AgendaExameRepository;

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
 * Integration tests for the {@link AgendaExameResource} REST controller.
 */
@SpringBootTest(classes = SaudepluplusApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AgendaExameResourceIT {

    @Autowired
    private AgendaExameRepository agendaExameRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAgendaExameMockMvc;

    private AgendaExame agendaExame;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AgendaExame createEntity(EntityManager em) {
        AgendaExame agendaExame = new AgendaExame();
        return agendaExame;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AgendaExame createUpdatedEntity(EntityManager em) {
        AgendaExame agendaExame = new AgendaExame();
        return agendaExame;
    }

    @BeforeEach
    public void initTest() {
        agendaExame = createEntity(em);
    }

    @Test
    @Transactional
    public void createAgendaExame() throws Exception {
        int databaseSizeBeforeCreate = agendaExameRepository.findAll().size();
        // Create the AgendaExame
        restAgendaExameMockMvc.perform(post("/api/agenda-exames").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(agendaExame)))
            .andExpect(status().isCreated());

        // Validate the AgendaExame in the database
        List<AgendaExame> agendaExameList = agendaExameRepository.findAll();
        assertThat(agendaExameList).hasSize(databaseSizeBeforeCreate + 1);
        AgendaExame testAgendaExame = agendaExameList.get(agendaExameList.size() - 1);
    }

    @Test
    @Transactional
    public void createAgendaExameWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = agendaExameRepository.findAll().size();

        // Create the AgendaExame with an existing ID
        agendaExame.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAgendaExameMockMvc.perform(post("/api/agenda-exames").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(agendaExame)))
            .andExpect(status().isBadRequest());

        // Validate the AgendaExame in the database
        List<AgendaExame> agendaExameList = agendaExameRepository.findAll();
        assertThat(agendaExameList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAgendaExames() throws Exception {
        // Initialize the database
        agendaExameRepository.saveAndFlush(agendaExame);

        // Get all the agendaExameList
        restAgendaExameMockMvc.perform(get("/api/agenda-exames?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(agendaExame.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getAgendaExame() throws Exception {
        // Initialize the database
        agendaExameRepository.saveAndFlush(agendaExame);

        // Get the agendaExame
        restAgendaExameMockMvc.perform(get("/api/agenda-exames/{id}", agendaExame.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(agendaExame.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingAgendaExame() throws Exception {
        // Get the agendaExame
        restAgendaExameMockMvc.perform(get("/api/agenda-exames/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAgendaExame() throws Exception {
        // Initialize the database
        agendaExameRepository.saveAndFlush(agendaExame);

        int databaseSizeBeforeUpdate = agendaExameRepository.findAll().size();

        // Update the agendaExame
        AgendaExame updatedAgendaExame = agendaExameRepository.findById(agendaExame.getId()).get();
        // Disconnect from session so that the updates on updatedAgendaExame are not directly saved in db
        em.detach(updatedAgendaExame);

        restAgendaExameMockMvc.perform(put("/api/agenda-exames").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAgendaExame)))
            .andExpect(status().isOk());

        // Validate the AgendaExame in the database
        List<AgendaExame> agendaExameList = agendaExameRepository.findAll();
        assertThat(agendaExameList).hasSize(databaseSizeBeforeUpdate);
        AgendaExame testAgendaExame = agendaExameList.get(agendaExameList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingAgendaExame() throws Exception {
        int databaseSizeBeforeUpdate = agendaExameRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAgendaExameMockMvc.perform(put("/api/agenda-exames").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(agendaExame)))
            .andExpect(status().isBadRequest());

        // Validate the AgendaExame in the database
        List<AgendaExame> agendaExameList = agendaExameRepository.findAll();
        assertThat(agendaExameList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAgendaExame() throws Exception {
        // Initialize the database
        agendaExameRepository.saveAndFlush(agendaExame);

        int databaseSizeBeforeDelete = agendaExameRepository.findAll().size();

        // Delete the agendaExame
        restAgendaExameMockMvc.perform(delete("/api/agenda-exames/{id}", agendaExame.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AgendaExame> agendaExameList = agendaExameRepository.findAll();
        assertThat(agendaExameList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
