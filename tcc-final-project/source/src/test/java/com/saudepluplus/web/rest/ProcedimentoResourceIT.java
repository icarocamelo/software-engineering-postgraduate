package com.saudepluplus.web.rest;

import com.saudepluplus.SaudepluplusApp;
import com.saudepluplus.domain.Procedimento;
import com.saudepluplus.repository.ProcedimentoRepository;

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
 * Integration tests for the {@link ProcedimentoResource} REST controller.
 */
@SpringBootTest(classes = SaudepluplusApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProcedimentoResourceIT {

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final Double DEFAULT_PRECO = 1D;
    private static final Double UPDATED_PRECO = 2D;

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    @Autowired
    private ProcedimentoRepository procedimentoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProcedimentoMockMvc;

    private Procedimento procedimento;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Procedimento createEntity(EntityManager em) {
        Procedimento procedimento = new Procedimento()
            .descricao(DEFAULT_DESCRICAO)
            .preco(DEFAULT_PRECO)
            .codigo(DEFAULT_CODIGO);
        return procedimento;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Procedimento createUpdatedEntity(EntityManager em) {
        Procedimento procedimento = new Procedimento()
            .descricao(UPDATED_DESCRICAO)
            .preco(UPDATED_PRECO)
            .codigo(UPDATED_CODIGO);
        return procedimento;
    }

    @BeforeEach
    public void initTest() {
        procedimento = createEntity(em);
    }

    @Test
    @Transactional
    public void createProcedimento() throws Exception {
        int databaseSizeBeforeCreate = procedimentoRepository.findAll().size();
        // Create the Procedimento
        restProcedimentoMockMvc.perform(post("/api/procedimentos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(procedimento)))
            .andExpect(status().isCreated());

        // Validate the Procedimento in the database
        List<Procedimento> procedimentoList = procedimentoRepository.findAll();
        assertThat(procedimentoList).hasSize(databaseSizeBeforeCreate + 1);
        Procedimento testProcedimento = procedimentoList.get(procedimentoList.size() - 1);
        assertThat(testProcedimento.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testProcedimento.getPreco()).isEqualTo(DEFAULT_PRECO);
        assertThat(testProcedimento.getCodigo()).isEqualTo(DEFAULT_CODIGO);
    }

    @Test
    @Transactional
    public void createProcedimentoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = procedimentoRepository.findAll().size();

        // Create the Procedimento with an existing ID
        procedimento.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProcedimentoMockMvc.perform(post("/api/procedimentos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(procedimento)))
            .andExpect(status().isBadRequest());

        // Validate the Procedimento in the database
        List<Procedimento> procedimentoList = procedimentoRepository.findAll();
        assertThat(procedimentoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProcedimentos() throws Exception {
        // Initialize the database
        procedimentoRepository.saveAndFlush(procedimento);

        // Get all the procedimentoList
        restProcedimentoMockMvc.perform(get("/api/procedimentos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(procedimento.getId().intValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].preco").value(hasItem(DEFAULT_PRECO.doubleValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)));
    }
    
    @Test
    @Transactional
    public void getProcedimento() throws Exception {
        // Initialize the database
        procedimentoRepository.saveAndFlush(procedimento);

        // Get the procedimento
        restProcedimentoMockMvc.perform(get("/api/procedimentos/{id}", procedimento.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(procedimento.getId().intValue()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO))
            .andExpect(jsonPath("$.preco").value(DEFAULT_PRECO.doubleValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO));
    }
    @Test
    @Transactional
    public void getNonExistingProcedimento() throws Exception {
        // Get the procedimento
        restProcedimentoMockMvc.perform(get("/api/procedimentos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProcedimento() throws Exception {
        // Initialize the database
        procedimentoRepository.saveAndFlush(procedimento);

        int databaseSizeBeforeUpdate = procedimentoRepository.findAll().size();

        // Update the procedimento
        Procedimento updatedProcedimento = procedimentoRepository.findById(procedimento.getId()).get();
        // Disconnect from session so that the updates on updatedProcedimento are not directly saved in db
        em.detach(updatedProcedimento);
        updatedProcedimento
            .descricao(UPDATED_DESCRICAO)
            .preco(UPDATED_PRECO)
            .codigo(UPDATED_CODIGO);

        restProcedimentoMockMvc.perform(put("/api/procedimentos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProcedimento)))
            .andExpect(status().isOk());

        // Validate the Procedimento in the database
        List<Procedimento> procedimentoList = procedimentoRepository.findAll();
        assertThat(procedimentoList).hasSize(databaseSizeBeforeUpdate);
        Procedimento testProcedimento = procedimentoList.get(procedimentoList.size() - 1);
        assertThat(testProcedimento.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testProcedimento.getPreco()).isEqualTo(UPDATED_PRECO);
        assertThat(testProcedimento.getCodigo()).isEqualTo(UPDATED_CODIGO);
    }

    @Test
    @Transactional
    public void updateNonExistingProcedimento() throws Exception {
        int databaseSizeBeforeUpdate = procedimentoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProcedimentoMockMvc.perform(put("/api/procedimentos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(procedimento)))
            .andExpect(status().isBadRequest());

        // Validate the Procedimento in the database
        List<Procedimento> procedimentoList = procedimentoRepository.findAll();
        assertThat(procedimentoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProcedimento() throws Exception {
        // Initialize the database
        procedimentoRepository.saveAndFlush(procedimento);

        int databaseSizeBeforeDelete = procedimentoRepository.findAll().size();

        // Delete the procedimento
        restProcedimentoMockMvc.perform(delete("/api/procedimentos/{id}", procedimento.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Procedimento> procedimentoList = procedimentoRepository.findAll();
        assertThat(procedimentoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
