package com.saudepluplus.web.rest;

import com.saudepluplus.SaudepluplusApp;
import com.saudepluplus.domain.Profissional;
import com.saudepluplus.repository.ProfissionalRepository;

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
 * Integration tests for the {@link ProfissionalResource} REST controller.
 */
@SpringBootTest(classes = SaudepluplusApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProfissionalResourceIT {

    private static final String DEFAULT_U_UID = "AAAAAAAAAA";
    private static final String UPDATED_U_UID = "BBBBBBBBBB";

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_R_G = "AAAAAAAAAA";
    private static final String UPDATED_R_G = "BBBBBBBBBB";

    private static final String DEFAULT_C_PF = "AAAAAAAAAA";
    private static final String UPDATED_C_PF = "BBBBBBBBBB";

    @Autowired
    private ProfissionalRepository profissionalRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProfissionalMockMvc;

    private Profissional profissional;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Profissional createEntity(EntityManager em) {
        Profissional profissional = new Profissional()
            .uUID(DEFAULT_U_UID)
            .nome(DEFAULT_NOME)
            .rG(DEFAULT_R_G)
            .cPF(DEFAULT_C_PF);
        return profissional;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Profissional createUpdatedEntity(EntityManager em) {
        Profissional profissional = new Profissional()
            .uUID(UPDATED_U_UID)
            .nome(UPDATED_NOME)
            .rG(UPDATED_R_G)
            .cPF(UPDATED_C_PF);
        return profissional;
    }

    @BeforeEach
    public void initTest() {
        profissional = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfissional() throws Exception {
        int databaseSizeBeforeCreate = profissionalRepository.findAll().size();
        // Create the Profissional
        restProfissionalMockMvc.perform(post("/api/profissionals").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profissional)))
            .andExpect(status().isCreated());

        // Validate the Profissional in the database
        List<Profissional> profissionalList = profissionalRepository.findAll();
        assertThat(profissionalList).hasSize(databaseSizeBeforeCreate + 1);
        Profissional testProfissional = profissionalList.get(profissionalList.size() - 1);
        assertThat(testProfissional.getuUID()).isEqualTo(DEFAULT_U_UID);
        assertThat(testProfissional.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testProfissional.getrG()).isEqualTo(DEFAULT_R_G);
        assertThat(testProfissional.getcPF()).isEqualTo(DEFAULT_C_PF);
    }

    @Test
    @Transactional
    public void createProfissionalWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = profissionalRepository.findAll().size();

        // Create the Profissional with an existing ID
        profissional.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfissionalMockMvc.perform(post("/api/profissionals").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profissional)))
            .andExpect(status().isBadRequest());

        // Validate the Profissional in the database
        List<Profissional> profissionalList = profissionalRepository.findAll();
        assertThat(profissionalList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProfissionals() throws Exception {
        // Initialize the database
        profissionalRepository.saveAndFlush(profissional);

        // Get all the profissionalList
        restProfissionalMockMvc.perform(get("/api/profissionals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(profissional.getId().intValue())))
            .andExpect(jsonPath("$.[*].uUID").value(hasItem(DEFAULT_U_UID)))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].rG").value(hasItem(DEFAULT_R_G)))
            .andExpect(jsonPath("$.[*].cPF").value(hasItem(DEFAULT_C_PF)));
    }
    
    @Test
    @Transactional
    public void getProfissional() throws Exception {
        // Initialize the database
        profissionalRepository.saveAndFlush(profissional);

        // Get the profissional
        restProfissionalMockMvc.perform(get("/api/profissionals/{id}", profissional.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(profissional.getId().intValue()))
            .andExpect(jsonPath("$.uUID").value(DEFAULT_U_UID))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.rG").value(DEFAULT_R_G))
            .andExpect(jsonPath("$.cPF").value(DEFAULT_C_PF));
    }
    @Test
    @Transactional
    public void getNonExistingProfissional() throws Exception {
        // Get the profissional
        restProfissionalMockMvc.perform(get("/api/profissionals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfissional() throws Exception {
        // Initialize the database
        profissionalRepository.saveAndFlush(profissional);

        int databaseSizeBeforeUpdate = profissionalRepository.findAll().size();

        // Update the profissional
        Profissional updatedProfissional = profissionalRepository.findById(profissional.getId()).get();
        // Disconnect from session so that the updates on updatedProfissional are not directly saved in db
        em.detach(updatedProfissional);
        updatedProfissional
            .uUID(UPDATED_U_UID)
            .nome(UPDATED_NOME)
            .rG(UPDATED_R_G)
            .cPF(UPDATED_C_PF);

        restProfissionalMockMvc.perform(put("/api/profissionals").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProfissional)))
            .andExpect(status().isOk());

        // Validate the Profissional in the database
        List<Profissional> profissionalList = profissionalRepository.findAll();
        assertThat(profissionalList).hasSize(databaseSizeBeforeUpdate);
        Profissional testProfissional = profissionalList.get(profissionalList.size() - 1);
        assertThat(testProfissional.getuUID()).isEqualTo(UPDATED_U_UID);
        assertThat(testProfissional.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testProfissional.getrG()).isEqualTo(UPDATED_R_G);
        assertThat(testProfissional.getcPF()).isEqualTo(UPDATED_C_PF);
    }

    @Test
    @Transactional
    public void updateNonExistingProfissional() throws Exception {
        int databaseSizeBeforeUpdate = profissionalRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProfissionalMockMvc.perform(put("/api/profissionals").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profissional)))
            .andExpect(status().isBadRequest());

        // Validate the Profissional in the database
        List<Profissional> profissionalList = profissionalRepository.findAll();
        assertThat(profissionalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProfissional() throws Exception {
        // Initialize the database
        profissionalRepository.saveAndFlush(profissional);

        int databaseSizeBeforeDelete = profissionalRepository.findAll().size();

        // Delete the profissional
        restProfissionalMockMvc.perform(delete("/api/profissionals/{id}", profissional.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Profissional> profissionalList = profissionalRepository.findAll();
        assertThat(profissionalList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
