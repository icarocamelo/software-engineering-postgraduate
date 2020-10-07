package com.saudepluplus.web.rest;

import com.saudepluplus.SaudepluplusApp;
import com.saudepluplus.domain.Exame;
import com.saudepluplus.repository.ExameRepository;

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
 * Integration tests for the {@link ExameResource} REST controller.
 */
@SpringBootTest(classes = SaudepluplusApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ExameResourceIT {

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    private static final Double DEFAULT_PRECO = 1D;
    private static final Double UPDATED_PRECO = 2D;

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    @Autowired
    private ExameRepository exameRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restExameMockMvc;

    private Exame exame;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Exame createEntity(EntityManager em) {
        Exame exame = new Exame()
            .descricao(DEFAULT_DESCRICAO)
            .preco(DEFAULT_PRECO)
            .codigo(DEFAULT_CODIGO);
        return exame;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Exame createUpdatedEntity(EntityManager em) {
        Exame exame = new Exame()
            .descricao(UPDATED_DESCRICAO)
            .preco(UPDATED_PRECO)
            .codigo(UPDATED_CODIGO);
        return exame;
    }

    @BeforeEach
    public void initTest() {
        exame = createEntity(em);
    }

    @Test
    @Transactional
    public void createExame() throws Exception {
        int databaseSizeBeforeCreate = exameRepository.findAll().size();
        // Create the Exame
        restExameMockMvc.perform(post("/api/exames").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(exame)))
            .andExpect(status().isCreated());

        // Validate the Exame in the database
        List<Exame> exameList = exameRepository.findAll();
        assertThat(exameList).hasSize(databaseSizeBeforeCreate + 1);
        Exame testExame = exameList.get(exameList.size() - 1);
        assertThat(testExame.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
        assertThat(testExame.getPreco()).isEqualTo(DEFAULT_PRECO);
        assertThat(testExame.getCodigo()).isEqualTo(DEFAULT_CODIGO);
    }

    @Test
    @Transactional
    public void createExameWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = exameRepository.findAll().size();

        // Create the Exame with an existing ID
        exame.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExameMockMvc.perform(post("/api/exames").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(exame)))
            .andExpect(status().isBadRequest());

        // Validate the Exame in the database
        List<Exame> exameList = exameRepository.findAll();
        assertThat(exameList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllExames() throws Exception {
        // Initialize the database
        exameRepository.saveAndFlush(exame);

        // Get all the exameList
        restExameMockMvc.perform(get("/api/exames?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(exame.getId().intValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO)))
            .andExpect(jsonPath("$.[*].preco").value(hasItem(DEFAULT_PRECO.doubleValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO)));
    }
    
    @Test
    @Transactional
    public void getExame() throws Exception {
        // Initialize the database
        exameRepository.saveAndFlush(exame);

        // Get the exame
        restExameMockMvc.perform(get("/api/exames/{id}", exame.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(exame.getId().intValue()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO))
            .andExpect(jsonPath("$.preco").value(DEFAULT_PRECO.doubleValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO));
    }
    @Test
    @Transactional
    public void getNonExistingExame() throws Exception {
        // Get the exame
        restExameMockMvc.perform(get("/api/exames/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExame() throws Exception {
        // Initialize the database
        exameRepository.saveAndFlush(exame);

        int databaseSizeBeforeUpdate = exameRepository.findAll().size();

        // Update the exame
        Exame updatedExame = exameRepository.findById(exame.getId()).get();
        // Disconnect from session so that the updates on updatedExame are not directly saved in db
        em.detach(updatedExame);
        updatedExame
            .descricao(UPDATED_DESCRICAO)
            .preco(UPDATED_PRECO)
            .codigo(UPDATED_CODIGO);

        restExameMockMvc.perform(put("/api/exames").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedExame)))
            .andExpect(status().isOk());

        // Validate the Exame in the database
        List<Exame> exameList = exameRepository.findAll();
        assertThat(exameList).hasSize(databaseSizeBeforeUpdate);
        Exame testExame = exameList.get(exameList.size() - 1);
        assertThat(testExame.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
        assertThat(testExame.getPreco()).isEqualTo(UPDATED_PRECO);
        assertThat(testExame.getCodigo()).isEqualTo(UPDATED_CODIGO);
    }

    @Test
    @Transactional
    public void updateNonExistingExame() throws Exception {
        int databaseSizeBeforeUpdate = exameRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restExameMockMvc.perform(put("/api/exames").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(exame)))
            .andExpect(status().isBadRequest());

        // Validate the Exame in the database
        List<Exame> exameList = exameRepository.findAll();
        assertThat(exameList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteExame() throws Exception {
        // Initialize the database
        exameRepository.saveAndFlush(exame);

        int databaseSizeBeforeDelete = exameRepository.findAll().size();

        // Delete the exame
        restExameMockMvc.perform(delete("/api/exames/{id}", exame.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Exame> exameList = exameRepository.findAll();
        assertThat(exameList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
