package com.saudepluplus.web.rest;

import com.saudepluplus.SaudepluplusApp;
import com.saudepluplus.domain.Laboratorio;
import com.saudepluplus.repository.LaboratorioRepository;

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

import com.saudepluplus.domain.enumeration.TipoUnidadeSaude;
/**
 * Integration tests for the {@link LaboratorioResource} REST controller.
 */
@SpringBootTest(classes = SaudepluplusApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class LaboratorioResourceIT {

    private static final String DEFAULT_C_NPJ = "AAAAAAAAAA";
    private static final String UPDATED_C_NPJ = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONE = "BBBBBBBBBB";

    private static final String DEFAULT_C_EP = "AAAAAAAAAA";
    private static final String UPDATED_C_EP = "BBBBBBBBBB";

    private static final String DEFAULT_RAZAO_SOCIAL = "AAAAAAAAAA";
    private static final String UPDATED_RAZAO_SOCIAL = "BBBBBBBBBB";

    private static final String DEFAULT_NOME_FANTASIA = "AAAAAAAAAA";
    private static final String UPDATED_NOME_FANTASIA = "BBBBBBBBBB";

    private static final TipoUnidadeSaude DEFAULT_TIPO_UNIDADE_SAUDE = TipoUnidadeSaude.PUBLICA;
    private static final TipoUnidadeSaude UPDATED_TIPO_UNIDADE_SAUDE = TipoUnidadeSaude.PARTICULAR;

    @Autowired
    private LaboratorioRepository laboratorioRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLaboratorioMockMvc;

    private Laboratorio laboratorio;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Laboratorio createEntity(EntityManager em) {
        Laboratorio laboratorio = new Laboratorio()
            .cNPJ(DEFAULT_C_NPJ)
            .telefone(DEFAULT_TELEFONE)
            .cEP(DEFAULT_C_EP)
            .razaoSocial(DEFAULT_RAZAO_SOCIAL)
            .nomeFantasia(DEFAULT_NOME_FANTASIA)
            .tipoUnidadeSaude(DEFAULT_TIPO_UNIDADE_SAUDE);
        return laboratorio;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Laboratorio createUpdatedEntity(EntityManager em) {
        Laboratorio laboratorio = new Laboratorio()
            .cNPJ(UPDATED_C_NPJ)
            .telefone(UPDATED_TELEFONE)
            .cEP(UPDATED_C_EP)
            .razaoSocial(UPDATED_RAZAO_SOCIAL)
            .nomeFantasia(UPDATED_NOME_FANTASIA)
            .tipoUnidadeSaude(UPDATED_TIPO_UNIDADE_SAUDE);
        return laboratorio;
    }

    @BeforeEach
    public void initTest() {
        laboratorio = createEntity(em);
    }

    @Test
    @Transactional
    public void createLaboratorio() throws Exception {
        int databaseSizeBeforeCreate = laboratorioRepository.findAll().size();
        // Create the Laboratorio
        restLaboratorioMockMvc.perform(post("/api/laboratorios").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(laboratorio)))
            .andExpect(status().isCreated());

        // Validate the Laboratorio in the database
        List<Laboratorio> laboratorioList = laboratorioRepository.findAll();
        assertThat(laboratorioList).hasSize(databaseSizeBeforeCreate + 1);
        Laboratorio testLaboratorio = laboratorioList.get(laboratorioList.size() - 1);
        assertThat(testLaboratorio.getcNPJ()).isEqualTo(DEFAULT_C_NPJ);
        assertThat(testLaboratorio.getTelefone()).isEqualTo(DEFAULT_TELEFONE);
        assertThat(testLaboratorio.getcEP()).isEqualTo(DEFAULT_C_EP);
        assertThat(testLaboratorio.getRazaoSocial()).isEqualTo(DEFAULT_RAZAO_SOCIAL);
        assertThat(testLaboratorio.getNomeFantasia()).isEqualTo(DEFAULT_NOME_FANTASIA);
        assertThat(testLaboratorio.getTipoUnidadeSaude()).isEqualTo(DEFAULT_TIPO_UNIDADE_SAUDE);
    }

    @Test
    @Transactional
    public void createLaboratorioWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = laboratorioRepository.findAll().size();

        // Create the Laboratorio with an existing ID
        laboratorio.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restLaboratorioMockMvc.perform(post("/api/laboratorios").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(laboratorio)))
            .andExpect(status().isBadRequest());

        // Validate the Laboratorio in the database
        List<Laboratorio> laboratorioList = laboratorioRepository.findAll();
        assertThat(laboratorioList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllLaboratorios() throws Exception {
        // Initialize the database
        laboratorioRepository.saveAndFlush(laboratorio);

        // Get all the laboratorioList
        restLaboratorioMockMvc.perform(get("/api/laboratorios?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(laboratorio.getId().intValue())))
            .andExpect(jsonPath("$.[*].cNPJ").value(hasItem(DEFAULT_C_NPJ)))
            .andExpect(jsonPath("$.[*].telefone").value(hasItem(DEFAULT_TELEFONE)))
            .andExpect(jsonPath("$.[*].cEP").value(hasItem(DEFAULT_C_EP)))
            .andExpect(jsonPath("$.[*].razaoSocial").value(hasItem(DEFAULT_RAZAO_SOCIAL)))
            .andExpect(jsonPath("$.[*].nomeFantasia").value(hasItem(DEFAULT_NOME_FANTASIA)))
            .andExpect(jsonPath("$.[*].tipoUnidadeSaude").value(hasItem(DEFAULT_TIPO_UNIDADE_SAUDE.toString())));
    }
    
    @Test
    @Transactional
    public void getLaboratorio() throws Exception {
        // Initialize the database
        laboratorioRepository.saveAndFlush(laboratorio);

        // Get the laboratorio
        restLaboratorioMockMvc.perform(get("/api/laboratorios/{id}", laboratorio.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(laboratorio.getId().intValue()))
            .andExpect(jsonPath("$.cNPJ").value(DEFAULT_C_NPJ))
            .andExpect(jsonPath("$.telefone").value(DEFAULT_TELEFONE))
            .andExpect(jsonPath("$.cEP").value(DEFAULT_C_EP))
            .andExpect(jsonPath("$.razaoSocial").value(DEFAULT_RAZAO_SOCIAL))
            .andExpect(jsonPath("$.nomeFantasia").value(DEFAULT_NOME_FANTASIA))
            .andExpect(jsonPath("$.tipoUnidadeSaude").value(DEFAULT_TIPO_UNIDADE_SAUDE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingLaboratorio() throws Exception {
        // Get the laboratorio
        restLaboratorioMockMvc.perform(get("/api/laboratorios/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateLaboratorio() throws Exception {
        // Initialize the database
        laboratorioRepository.saveAndFlush(laboratorio);

        int databaseSizeBeforeUpdate = laboratorioRepository.findAll().size();

        // Update the laboratorio
        Laboratorio updatedLaboratorio = laboratorioRepository.findById(laboratorio.getId()).get();
        // Disconnect from session so that the updates on updatedLaboratorio are not directly saved in db
        em.detach(updatedLaboratorio);
        updatedLaboratorio
            .cNPJ(UPDATED_C_NPJ)
            .telefone(UPDATED_TELEFONE)
            .cEP(UPDATED_C_EP)
            .razaoSocial(UPDATED_RAZAO_SOCIAL)
            .nomeFantasia(UPDATED_NOME_FANTASIA)
            .tipoUnidadeSaude(UPDATED_TIPO_UNIDADE_SAUDE);

        restLaboratorioMockMvc.perform(put("/api/laboratorios").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedLaboratorio)))
            .andExpect(status().isOk());

        // Validate the Laboratorio in the database
        List<Laboratorio> laboratorioList = laboratorioRepository.findAll();
        assertThat(laboratorioList).hasSize(databaseSizeBeforeUpdate);
        Laboratorio testLaboratorio = laboratorioList.get(laboratorioList.size() - 1);
        assertThat(testLaboratorio.getcNPJ()).isEqualTo(UPDATED_C_NPJ);
        assertThat(testLaboratorio.getTelefone()).isEqualTo(UPDATED_TELEFONE);
        assertThat(testLaboratorio.getcEP()).isEqualTo(UPDATED_C_EP);
        assertThat(testLaboratorio.getRazaoSocial()).isEqualTo(UPDATED_RAZAO_SOCIAL);
        assertThat(testLaboratorio.getNomeFantasia()).isEqualTo(UPDATED_NOME_FANTASIA);
        assertThat(testLaboratorio.getTipoUnidadeSaude()).isEqualTo(UPDATED_TIPO_UNIDADE_SAUDE);
    }

    @Test
    @Transactional
    public void updateNonExistingLaboratorio() throws Exception {
        int databaseSizeBeforeUpdate = laboratorioRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLaboratorioMockMvc.perform(put("/api/laboratorios").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(laboratorio)))
            .andExpect(status().isBadRequest());

        // Validate the Laboratorio in the database
        List<Laboratorio> laboratorioList = laboratorioRepository.findAll();
        assertThat(laboratorioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteLaboratorio() throws Exception {
        // Initialize the database
        laboratorioRepository.saveAndFlush(laboratorio);

        int databaseSizeBeforeDelete = laboratorioRepository.findAll().size();

        // Delete the laboratorio
        restLaboratorioMockMvc.perform(delete("/api/laboratorios/{id}", laboratorio.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Laboratorio> laboratorioList = laboratorioRepository.findAll();
        assertThat(laboratorioList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
