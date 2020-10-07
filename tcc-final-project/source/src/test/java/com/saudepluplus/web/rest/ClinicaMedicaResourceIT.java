package com.saudepluplus.web.rest;

import com.saudepluplus.SaudepluplusApp;
import com.saudepluplus.domain.ClinicaMedica;
import com.saudepluplus.repository.ClinicaMedicaRepository;

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
 * Integration tests for the {@link ClinicaMedicaResource} REST controller.
 */
@SpringBootTest(classes = SaudepluplusApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ClinicaMedicaResourceIT {

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
    private ClinicaMedicaRepository clinicaMedicaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restClinicaMedicaMockMvc;

    private ClinicaMedica clinicaMedica;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ClinicaMedica createEntity(EntityManager em) {
        ClinicaMedica clinicaMedica = new ClinicaMedica()
            .cNPJ(DEFAULT_C_NPJ)
            .telefone(DEFAULT_TELEFONE)
            .cEP(DEFAULT_C_EP)
            .razaoSocial(DEFAULT_RAZAO_SOCIAL)
            .nomeFantasia(DEFAULT_NOME_FANTASIA)
            .tipoUnidadeSaude(DEFAULT_TIPO_UNIDADE_SAUDE);
        return clinicaMedica;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ClinicaMedica createUpdatedEntity(EntityManager em) {
        ClinicaMedica clinicaMedica = new ClinicaMedica()
            .cNPJ(UPDATED_C_NPJ)
            .telefone(UPDATED_TELEFONE)
            .cEP(UPDATED_C_EP)
            .razaoSocial(UPDATED_RAZAO_SOCIAL)
            .nomeFantasia(UPDATED_NOME_FANTASIA)
            .tipoUnidadeSaude(UPDATED_TIPO_UNIDADE_SAUDE);
        return clinicaMedica;
    }

    @BeforeEach
    public void initTest() {
        clinicaMedica = createEntity(em);
    }

    @Test
    @Transactional
    public void createClinicaMedica() throws Exception {
        int databaseSizeBeforeCreate = clinicaMedicaRepository.findAll().size();
        // Create the ClinicaMedica
        restClinicaMedicaMockMvc.perform(post("/api/clinica-medicas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(clinicaMedica)))
            .andExpect(status().isCreated());

        // Validate the ClinicaMedica in the database
        List<ClinicaMedica> clinicaMedicaList = clinicaMedicaRepository.findAll();
        assertThat(clinicaMedicaList).hasSize(databaseSizeBeforeCreate + 1);
        ClinicaMedica testClinicaMedica = clinicaMedicaList.get(clinicaMedicaList.size() - 1);
        assertThat(testClinicaMedica.getcNPJ()).isEqualTo(DEFAULT_C_NPJ);
        assertThat(testClinicaMedica.getTelefone()).isEqualTo(DEFAULT_TELEFONE);
        assertThat(testClinicaMedica.getcEP()).isEqualTo(DEFAULT_C_EP);
        assertThat(testClinicaMedica.getRazaoSocial()).isEqualTo(DEFAULT_RAZAO_SOCIAL);
        assertThat(testClinicaMedica.getNomeFantasia()).isEqualTo(DEFAULT_NOME_FANTASIA);
        assertThat(testClinicaMedica.getTipoUnidadeSaude()).isEqualTo(DEFAULT_TIPO_UNIDADE_SAUDE);
    }

    @Test
    @Transactional
    public void createClinicaMedicaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = clinicaMedicaRepository.findAll().size();

        // Create the ClinicaMedica with an existing ID
        clinicaMedica.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restClinicaMedicaMockMvc.perform(post("/api/clinica-medicas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(clinicaMedica)))
            .andExpect(status().isBadRequest());

        // Validate the ClinicaMedica in the database
        List<ClinicaMedica> clinicaMedicaList = clinicaMedicaRepository.findAll();
        assertThat(clinicaMedicaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllClinicaMedicas() throws Exception {
        // Initialize the database
        clinicaMedicaRepository.saveAndFlush(clinicaMedica);

        // Get all the clinicaMedicaList
        restClinicaMedicaMockMvc.perform(get("/api/clinica-medicas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(clinicaMedica.getId().intValue())))
            .andExpect(jsonPath("$.[*].cNPJ").value(hasItem(DEFAULT_C_NPJ)))
            .andExpect(jsonPath("$.[*].telefone").value(hasItem(DEFAULT_TELEFONE)))
            .andExpect(jsonPath("$.[*].cEP").value(hasItem(DEFAULT_C_EP)))
            .andExpect(jsonPath("$.[*].razaoSocial").value(hasItem(DEFAULT_RAZAO_SOCIAL)))
            .andExpect(jsonPath("$.[*].nomeFantasia").value(hasItem(DEFAULT_NOME_FANTASIA)))
            .andExpect(jsonPath("$.[*].tipoUnidadeSaude").value(hasItem(DEFAULT_TIPO_UNIDADE_SAUDE.toString())));
    }
    
    @Test
    @Transactional
    public void getClinicaMedica() throws Exception {
        // Initialize the database
        clinicaMedicaRepository.saveAndFlush(clinicaMedica);

        // Get the clinicaMedica
        restClinicaMedicaMockMvc.perform(get("/api/clinica-medicas/{id}", clinicaMedica.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(clinicaMedica.getId().intValue()))
            .andExpect(jsonPath("$.cNPJ").value(DEFAULT_C_NPJ))
            .andExpect(jsonPath("$.telefone").value(DEFAULT_TELEFONE))
            .andExpect(jsonPath("$.cEP").value(DEFAULT_C_EP))
            .andExpect(jsonPath("$.razaoSocial").value(DEFAULT_RAZAO_SOCIAL))
            .andExpect(jsonPath("$.nomeFantasia").value(DEFAULT_NOME_FANTASIA))
            .andExpect(jsonPath("$.tipoUnidadeSaude").value(DEFAULT_TIPO_UNIDADE_SAUDE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingClinicaMedica() throws Exception {
        // Get the clinicaMedica
        restClinicaMedicaMockMvc.perform(get("/api/clinica-medicas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateClinicaMedica() throws Exception {
        // Initialize the database
        clinicaMedicaRepository.saveAndFlush(clinicaMedica);

        int databaseSizeBeforeUpdate = clinicaMedicaRepository.findAll().size();

        // Update the clinicaMedica
        ClinicaMedica updatedClinicaMedica = clinicaMedicaRepository.findById(clinicaMedica.getId()).get();
        // Disconnect from session so that the updates on updatedClinicaMedica are not directly saved in db
        em.detach(updatedClinicaMedica);
        updatedClinicaMedica
            .cNPJ(UPDATED_C_NPJ)
            .telefone(UPDATED_TELEFONE)
            .cEP(UPDATED_C_EP)
            .razaoSocial(UPDATED_RAZAO_SOCIAL)
            .nomeFantasia(UPDATED_NOME_FANTASIA)
            .tipoUnidadeSaude(UPDATED_TIPO_UNIDADE_SAUDE);

        restClinicaMedicaMockMvc.perform(put("/api/clinica-medicas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedClinicaMedica)))
            .andExpect(status().isOk());

        // Validate the ClinicaMedica in the database
        List<ClinicaMedica> clinicaMedicaList = clinicaMedicaRepository.findAll();
        assertThat(clinicaMedicaList).hasSize(databaseSizeBeforeUpdate);
        ClinicaMedica testClinicaMedica = clinicaMedicaList.get(clinicaMedicaList.size() - 1);
        assertThat(testClinicaMedica.getcNPJ()).isEqualTo(UPDATED_C_NPJ);
        assertThat(testClinicaMedica.getTelefone()).isEqualTo(UPDATED_TELEFONE);
        assertThat(testClinicaMedica.getcEP()).isEqualTo(UPDATED_C_EP);
        assertThat(testClinicaMedica.getRazaoSocial()).isEqualTo(UPDATED_RAZAO_SOCIAL);
        assertThat(testClinicaMedica.getNomeFantasia()).isEqualTo(UPDATED_NOME_FANTASIA);
        assertThat(testClinicaMedica.getTipoUnidadeSaude()).isEqualTo(UPDATED_TIPO_UNIDADE_SAUDE);
    }

    @Test
    @Transactional
    public void updateNonExistingClinicaMedica() throws Exception {
        int databaseSizeBeforeUpdate = clinicaMedicaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restClinicaMedicaMockMvc.perform(put("/api/clinica-medicas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(clinicaMedica)))
            .andExpect(status().isBadRequest());

        // Validate the ClinicaMedica in the database
        List<ClinicaMedica> clinicaMedicaList = clinicaMedicaRepository.findAll();
        assertThat(clinicaMedicaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteClinicaMedica() throws Exception {
        // Initialize the database
        clinicaMedicaRepository.saveAndFlush(clinicaMedica);

        int databaseSizeBeforeDelete = clinicaMedicaRepository.findAll().size();

        // Delete the clinicaMedica
        restClinicaMedicaMockMvc.perform(delete("/api/clinica-medicas/{id}", clinicaMedica.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ClinicaMedica> clinicaMedicaList = clinicaMedicaRepository.findAll();
        assertThat(clinicaMedicaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
