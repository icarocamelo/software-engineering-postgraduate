package com.saudepluplus.web.rest;

import com.saudepluplus.SaudepluplusApp;
import com.saudepluplus.domain.AgendaConsulta;
import com.saudepluplus.repository.AgendaConsultaRepository;

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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AgendaConsultaResource} REST controller.
 */
@SpringBootTest(classes = SaudepluplusApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AgendaConsultaResourceIT {

    private static final LocalDate DEFAULT_DATA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private AgendaConsultaRepository agendaConsultaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAgendaConsultaMockMvc;

    private AgendaConsulta agendaConsulta;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AgendaConsulta createEntity(EntityManager em) {
        AgendaConsulta agendaConsulta = new AgendaConsulta()
            .data(DEFAULT_DATA);
        return agendaConsulta;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AgendaConsulta createUpdatedEntity(EntityManager em) {
        AgendaConsulta agendaConsulta = new AgendaConsulta()
            .data(UPDATED_DATA);
        return agendaConsulta;
    }

    @BeforeEach
    public void initTest() {
        agendaConsulta = createEntity(em);
    }

    @Test
    @Transactional
    public void createAgendaConsulta() throws Exception {
        int databaseSizeBeforeCreate = agendaConsultaRepository.findAll().size();
        // Create the AgendaConsulta
        restAgendaConsultaMockMvc.perform(post("/api/agenda-consultas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(agendaConsulta)))
            .andExpect(status().isCreated());

        // Validate the AgendaConsulta in the database
        List<AgendaConsulta> agendaConsultaList = agendaConsultaRepository.findAll();
        assertThat(agendaConsultaList).hasSize(databaseSizeBeforeCreate + 1);
        AgendaConsulta testAgendaConsulta = agendaConsultaList.get(agendaConsultaList.size() - 1);
        assertThat(testAgendaConsulta.getData()).isEqualTo(DEFAULT_DATA);
    }

    @Test
    @Transactional
    public void createAgendaConsultaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = agendaConsultaRepository.findAll().size();

        // Create the AgendaConsulta with an existing ID
        agendaConsulta.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAgendaConsultaMockMvc.perform(post("/api/agenda-consultas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(agendaConsulta)))
            .andExpect(status().isBadRequest());

        // Validate the AgendaConsulta in the database
        List<AgendaConsulta> agendaConsultaList = agendaConsultaRepository.findAll();
        assertThat(agendaConsultaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAgendaConsultas() throws Exception {
        // Initialize the database
        agendaConsultaRepository.saveAndFlush(agendaConsulta);

        // Get all the agendaConsultaList
        restAgendaConsultaMockMvc.perform(get("/api/agenda-consultas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(agendaConsulta.getId().intValue())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())));
    }
    
    @Test
    @Transactional
    public void getAgendaConsulta() throws Exception {
        // Initialize the database
        agendaConsultaRepository.saveAndFlush(agendaConsulta);

        // Get the agendaConsulta
        restAgendaConsultaMockMvc.perform(get("/api/agenda-consultas/{id}", agendaConsulta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(agendaConsulta.getId().intValue()))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingAgendaConsulta() throws Exception {
        // Get the agendaConsulta
        restAgendaConsultaMockMvc.perform(get("/api/agenda-consultas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAgendaConsulta() throws Exception {
        // Initialize the database
        agendaConsultaRepository.saveAndFlush(agendaConsulta);

        int databaseSizeBeforeUpdate = agendaConsultaRepository.findAll().size();

        // Update the agendaConsulta
        AgendaConsulta updatedAgendaConsulta = agendaConsultaRepository.findById(agendaConsulta.getId()).get();
        // Disconnect from session so that the updates on updatedAgendaConsulta are not directly saved in db
        em.detach(updatedAgendaConsulta);
        updatedAgendaConsulta
            .data(UPDATED_DATA);

        restAgendaConsultaMockMvc.perform(put("/api/agenda-consultas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAgendaConsulta)))
            .andExpect(status().isOk());

        // Validate the AgendaConsulta in the database
        List<AgendaConsulta> agendaConsultaList = agendaConsultaRepository.findAll();
        assertThat(agendaConsultaList).hasSize(databaseSizeBeforeUpdate);
        AgendaConsulta testAgendaConsulta = agendaConsultaList.get(agendaConsultaList.size() - 1);
        assertThat(testAgendaConsulta.getData()).isEqualTo(UPDATED_DATA);
    }

    @Test
    @Transactional
    public void updateNonExistingAgendaConsulta() throws Exception {
        int databaseSizeBeforeUpdate = agendaConsultaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAgendaConsultaMockMvc.perform(put("/api/agenda-consultas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(agendaConsulta)))
            .andExpect(status().isBadRequest());

        // Validate the AgendaConsulta in the database
        List<AgendaConsulta> agendaConsultaList = agendaConsultaRepository.findAll();
        assertThat(agendaConsultaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAgendaConsulta() throws Exception {
        // Initialize the database
        agendaConsultaRepository.saveAndFlush(agendaConsulta);

        int databaseSizeBeforeDelete = agendaConsultaRepository.findAll().size();

        // Delete the agendaConsulta
        restAgendaConsultaMockMvc.perform(delete("/api/agenda-consultas/{id}", agendaConsulta.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AgendaConsulta> agendaConsultaList = agendaConsultaRepository.findAll();
        assertThat(agendaConsultaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
