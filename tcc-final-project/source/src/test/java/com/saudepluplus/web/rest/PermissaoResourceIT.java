package com.saudepluplus.web.rest;

import com.saudepluplus.SaudepluplusApp;
import com.saudepluplus.domain.Permissao;
import com.saudepluplus.repository.PermissaoRepository;

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
 * Integration tests for the {@link PermissaoResource} REST controller.
 */
@SpringBootTest(classes = SaudepluplusApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PermissaoResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    @Autowired
    private PermissaoRepository permissaoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPermissaoMockMvc;

    private Permissao permissao;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Permissao createEntity(EntityManager em) {
        Permissao permissao = new Permissao()
            .nome(DEFAULT_NOME);
        return permissao;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Permissao createUpdatedEntity(EntityManager em) {
        Permissao permissao = new Permissao()
            .nome(UPDATED_NOME);
        return permissao;
    }

    @BeforeEach
    public void initTest() {
        permissao = createEntity(em);
    }

    @Test
    @Transactional
    public void createPermissao() throws Exception {
        int databaseSizeBeforeCreate = permissaoRepository.findAll().size();
        // Create the Permissao
        restPermissaoMockMvc.perform(post("/api/permissaos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(permissao)))
            .andExpect(status().isCreated());

        // Validate the Permissao in the database
        List<Permissao> permissaoList = permissaoRepository.findAll();
        assertThat(permissaoList).hasSize(databaseSizeBeforeCreate + 1);
        Permissao testPermissao = permissaoList.get(permissaoList.size() - 1);
        assertThat(testPermissao.getNome()).isEqualTo(DEFAULT_NOME);
    }

    @Test
    @Transactional
    public void createPermissaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = permissaoRepository.findAll().size();

        // Create the Permissao with an existing ID
        permissao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPermissaoMockMvc.perform(post("/api/permissaos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(permissao)))
            .andExpect(status().isBadRequest());

        // Validate the Permissao in the database
        List<Permissao> permissaoList = permissaoRepository.findAll();
        assertThat(permissaoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPermissaos() throws Exception {
        // Initialize the database
        permissaoRepository.saveAndFlush(permissao);

        // Get all the permissaoList
        restPermissaoMockMvc.perform(get("/api/permissaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(permissao.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)));
    }
    
    @Test
    @Transactional
    public void getPermissao() throws Exception {
        // Initialize the database
        permissaoRepository.saveAndFlush(permissao);

        // Get the permissao
        restPermissaoMockMvc.perform(get("/api/permissaos/{id}", permissao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(permissao.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME));
    }
    @Test
    @Transactional
    public void getNonExistingPermissao() throws Exception {
        // Get the permissao
        restPermissaoMockMvc.perform(get("/api/permissaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePermissao() throws Exception {
        // Initialize the database
        permissaoRepository.saveAndFlush(permissao);

        int databaseSizeBeforeUpdate = permissaoRepository.findAll().size();

        // Update the permissao
        Permissao updatedPermissao = permissaoRepository.findById(permissao.getId()).get();
        // Disconnect from session so that the updates on updatedPermissao are not directly saved in db
        em.detach(updatedPermissao);
        updatedPermissao
            .nome(UPDATED_NOME);

        restPermissaoMockMvc.perform(put("/api/permissaos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPermissao)))
            .andExpect(status().isOk());

        // Validate the Permissao in the database
        List<Permissao> permissaoList = permissaoRepository.findAll();
        assertThat(permissaoList).hasSize(databaseSizeBeforeUpdate);
        Permissao testPermissao = permissaoList.get(permissaoList.size() - 1);
        assertThat(testPermissao.getNome()).isEqualTo(UPDATED_NOME);
    }

    @Test
    @Transactional
    public void updateNonExistingPermissao() throws Exception {
        int databaseSizeBeforeUpdate = permissaoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPermissaoMockMvc.perform(put("/api/permissaos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(permissao)))
            .andExpect(status().isBadRequest());

        // Validate the Permissao in the database
        List<Permissao> permissaoList = permissaoRepository.findAll();
        assertThat(permissaoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePermissao() throws Exception {
        // Initialize the database
        permissaoRepository.saveAndFlush(permissao);

        int databaseSizeBeforeDelete = permissaoRepository.findAll().size();

        // Delete the permissao
        restPermissaoMockMvc.perform(delete("/api/permissaos/{id}", permissao.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Permissao> permissaoList = permissaoRepository.findAll();
        assertThat(permissaoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
