package com.saudepluplus.web.rest;

import com.saudepluplus.SaudepluplusApp;
import com.saudepluplus.domain.Agenda;
import com.saudepluplus.repository.AgendaRepository;

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
 * Integration tests for the {@link AgendaResource} REST controller.
 */
@SpringBootTest(classes = SaudepluplusApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AgendaResourceIT {

    private static final LocalDate DEFAULT_DATA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private AgendaRepository agendaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAgendaMockMvc;

    private Agenda agenda;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Agenda createEntity(EntityManager em) {
        Agenda agenda = new Agenda()
            .data(DEFAULT_DATA);
        return agenda;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Agenda createUpdatedEntity(EntityManager em) {
        Agenda agenda = new Agenda()
            .data(UPDATED_DATA);
        return agenda;
    }

    @BeforeEach
    public void initTest() {
        agenda = createEntity(em);
    }

    @Test
    @Transactional
    public void createAgenda() throws Exception {
        int databaseSizeBeforeCreate = agendaRepository.findAll().size();
        // Create the Agenda
        restAgendaMockMvc.perform(post("/api/agenda").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(agenda)))
            .andExpect(status().isCreated());

        // Validate the Agenda in the database
        List<Agenda> agendaList = agendaRepository.findAll();
        assertThat(agendaList).hasSize(databaseSizeBeforeCreate + 1);
        Agenda testAgenda = agendaList.get(agendaList.size() - 1);
        assertThat(testAgenda.getData()).isEqualTo(DEFAULT_DATA);
    }

    @Test
    @Transactional
    public void createAgendaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = agendaRepository.findAll().size();

        // Create the Agenda with an existing ID
        agenda.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAgendaMockMvc.perform(post("/api/agenda").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(agenda)))
            .andExpect(status().isBadRequest());

        // Validate the Agenda in the database
        List<Agenda> agendaList = agendaRepository.findAll();
        assertThat(agendaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAgenda() throws Exception {
        // Initialize the database
        agendaRepository.saveAndFlush(agenda);

        // Get all the agendaList
        restAgendaMockMvc.perform(get("/api/agenda?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(agenda.getId().intValue())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())));
    }
    
    @Test
    @Transactional
    public void getAgenda() throws Exception {
        // Initialize the database
        agendaRepository.saveAndFlush(agenda);

        // Get the agenda
        restAgendaMockMvc.perform(get("/api/agenda/{id}", agenda.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(agenda.getId().intValue()))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingAgenda() throws Exception {
        // Get the agenda
        restAgendaMockMvc.perform(get("/api/agenda/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAgenda() throws Exception {
        // Initialize the database
        agendaRepository.saveAndFlush(agenda);

        int databaseSizeBeforeUpdate = agendaRepository.findAll().size();

        // Update the agenda
        Agenda updatedAgenda = agendaRepository.findById(agenda.getId()).get();
        // Disconnect from session so that the updates on updatedAgenda are not directly saved in db
        em.detach(updatedAgenda);
        updatedAgenda
            .data(UPDATED_DATA);

        restAgendaMockMvc.perform(put("/api/agenda").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAgenda)))
            .andExpect(status().isOk());

        // Validate the Agenda in the database
        List<Agenda> agendaList = agendaRepository.findAll();
        assertThat(agendaList).hasSize(databaseSizeBeforeUpdate);
        Agenda testAgenda = agendaList.get(agendaList.size() - 1);
        assertThat(testAgenda.getData()).isEqualTo(UPDATED_DATA);
    }

    @Test
    @Transactional
    public void updateNonExistingAgenda() throws Exception {
        int databaseSizeBeforeUpdate = agendaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAgendaMockMvc.perform(put("/api/agenda").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(agenda)))
            .andExpect(status().isBadRequest());

        // Validate the Agenda in the database
        List<Agenda> agendaList = agendaRepository.findAll();
        assertThat(agendaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAgenda() throws Exception {
        // Initialize the database
        agendaRepository.saveAndFlush(agenda);

        int databaseSizeBeforeDelete = agendaRepository.findAll().size();

        // Delete the agenda
        restAgendaMockMvc.perform(delete("/api/agenda/{id}", agenda.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Agenda> agendaList = agendaRepository.findAll();
        assertThat(agendaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
