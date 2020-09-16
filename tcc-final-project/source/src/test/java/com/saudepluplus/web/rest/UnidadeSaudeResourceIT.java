package com.saudepluplus.web.rest;

import com.saudepluplus.SaudepluplusApp;
import com.saudepluplus.domain.UnidadeSaude;
import com.saudepluplus.repository.UnidadeSaudeRepository;

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
 * Integration tests for the {@link UnidadeSaudeResource} REST controller.
 */
@SpringBootTest(classes = SaudepluplusApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class UnidadeSaudeResourceIT {

    private static final String DEFAULT_U_UID = "AAAAAAAAAA";
    private static final String UPDATED_U_UID = "BBBBBBBBBB";

    private static final String DEFAULT_ENDERECO = "AAAAAAAAAA";
    private static final String UPDATED_ENDERECO = "BBBBBBBBBB";

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
    private UnidadeSaudeRepository unidadeSaudeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUnidadeSaudeMockMvc;

    private UnidadeSaude unidadeSaude;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UnidadeSaude createEntity(EntityManager em) {
        UnidadeSaude unidadeSaude = new UnidadeSaude()
            .uUID(DEFAULT_U_UID)
            .endereco(DEFAULT_ENDERECO)
            .cNPJ(DEFAULT_C_NPJ)
            .telefone(DEFAULT_TELEFONE)
            .cEP(DEFAULT_C_EP)
            .razaoSocial(DEFAULT_RAZAO_SOCIAL)
            .nomeFantasia(DEFAULT_NOME_FANTASIA)
            .tipoUnidadeSaude(DEFAULT_TIPO_UNIDADE_SAUDE);
        return unidadeSaude;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UnidadeSaude createUpdatedEntity(EntityManager em) {
        UnidadeSaude unidadeSaude = new UnidadeSaude()
            .uUID(UPDATED_U_UID)
            .endereco(UPDATED_ENDERECO)
            .cNPJ(UPDATED_C_NPJ)
            .telefone(UPDATED_TELEFONE)
            .cEP(UPDATED_C_EP)
            .razaoSocial(UPDATED_RAZAO_SOCIAL)
            .nomeFantasia(UPDATED_NOME_FANTASIA)
            .tipoUnidadeSaude(UPDATED_TIPO_UNIDADE_SAUDE);
        return unidadeSaude;
    }

    @BeforeEach
    public void initTest() {
        unidadeSaude = createEntity(em);
    }

    @Test
    @Transactional
    public void createUnidadeSaude() throws Exception {
        int databaseSizeBeforeCreate = unidadeSaudeRepository.findAll().size();
        // Create the UnidadeSaude
        restUnidadeSaudeMockMvc.perform(post("/api/unidade-saudes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(unidadeSaude)))
            .andExpect(status().isCreated());

        // Validate the UnidadeSaude in the database
        List<UnidadeSaude> unidadeSaudeList = unidadeSaudeRepository.findAll();
        assertThat(unidadeSaudeList).hasSize(databaseSizeBeforeCreate + 1);
        UnidadeSaude testUnidadeSaude = unidadeSaudeList.get(unidadeSaudeList.size() - 1);
        assertThat(testUnidadeSaude.getuUID()).isEqualTo(DEFAULT_U_UID);
        assertThat(testUnidadeSaude.getEndereco()).isEqualTo(DEFAULT_ENDERECO);
        assertThat(testUnidadeSaude.getcNPJ()).isEqualTo(DEFAULT_C_NPJ);
        assertThat(testUnidadeSaude.getTelefone()).isEqualTo(DEFAULT_TELEFONE);
        assertThat(testUnidadeSaude.getcEP()).isEqualTo(DEFAULT_C_EP);
        assertThat(testUnidadeSaude.getRazaoSocial()).isEqualTo(DEFAULT_RAZAO_SOCIAL);
        assertThat(testUnidadeSaude.getNomeFantasia()).isEqualTo(DEFAULT_NOME_FANTASIA);
        assertThat(testUnidadeSaude.getTipoUnidadeSaude()).isEqualTo(DEFAULT_TIPO_UNIDADE_SAUDE);
    }

    @Test
    @Transactional
    public void createUnidadeSaudeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = unidadeSaudeRepository.findAll().size();

        // Create the UnidadeSaude with an existing ID
        unidadeSaude.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUnidadeSaudeMockMvc.perform(post("/api/unidade-saudes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(unidadeSaude)))
            .andExpect(status().isBadRequest());

        // Validate the UnidadeSaude in the database
        List<UnidadeSaude> unidadeSaudeList = unidadeSaudeRepository.findAll();
        assertThat(unidadeSaudeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUnidadeSaudes() throws Exception {
        // Initialize the database
        unidadeSaudeRepository.saveAndFlush(unidadeSaude);

        // Get all the unidadeSaudeList
        restUnidadeSaudeMockMvc.perform(get("/api/unidade-saudes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(unidadeSaude.getId().intValue())))
            .andExpect(jsonPath("$.[*].uUID").value(hasItem(DEFAULT_U_UID)))
            .andExpect(jsonPath("$.[*].endereco").value(hasItem(DEFAULT_ENDERECO)))
            .andExpect(jsonPath("$.[*].cNPJ").value(hasItem(DEFAULT_C_NPJ)))
            .andExpect(jsonPath("$.[*].telefone").value(hasItem(DEFAULT_TELEFONE)))
            .andExpect(jsonPath("$.[*].cEP").value(hasItem(DEFAULT_C_EP)))
            .andExpect(jsonPath("$.[*].razaoSocial").value(hasItem(DEFAULT_RAZAO_SOCIAL)))
            .andExpect(jsonPath("$.[*].nomeFantasia").value(hasItem(DEFAULT_NOME_FANTASIA)))
            .andExpect(jsonPath("$.[*].tipoUnidadeSaude").value(hasItem(DEFAULT_TIPO_UNIDADE_SAUDE.toString())));
    }
    
    @Test
    @Transactional
    public void getUnidadeSaude() throws Exception {
        // Initialize the database
        unidadeSaudeRepository.saveAndFlush(unidadeSaude);

        // Get the unidadeSaude
        restUnidadeSaudeMockMvc.perform(get("/api/unidade-saudes/{id}", unidadeSaude.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(unidadeSaude.getId().intValue()))
            .andExpect(jsonPath("$.uUID").value(DEFAULT_U_UID))
            .andExpect(jsonPath("$.endereco").value(DEFAULT_ENDERECO))
            .andExpect(jsonPath("$.cNPJ").value(DEFAULT_C_NPJ))
            .andExpect(jsonPath("$.telefone").value(DEFAULT_TELEFONE))
            .andExpect(jsonPath("$.cEP").value(DEFAULT_C_EP))
            .andExpect(jsonPath("$.razaoSocial").value(DEFAULT_RAZAO_SOCIAL))
            .andExpect(jsonPath("$.nomeFantasia").value(DEFAULT_NOME_FANTASIA))
            .andExpect(jsonPath("$.tipoUnidadeSaude").value(DEFAULT_TIPO_UNIDADE_SAUDE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingUnidadeSaude() throws Exception {
        // Get the unidadeSaude
        restUnidadeSaudeMockMvc.perform(get("/api/unidade-saudes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUnidadeSaude() throws Exception {
        // Initialize the database
        unidadeSaudeRepository.saveAndFlush(unidadeSaude);

        int databaseSizeBeforeUpdate = unidadeSaudeRepository.findAll().size();

        // Update the unidadeSaude
        UnidadeSaude updatedUnidadeSaude = unidadeSaudeRepository.findById(unidadeSaude.getId()).get();
        // Disconnect from session so that the updates on updatedUnidadeSaude are not directly saved in db
        em.detach(updatedUnidadeSaude);
        updatedUnidadeSaude
            .uUID(UPDATED_U_UID)
            .endereco(UPDATED_ENDERECO)
            .cNPJ(UPDATED_C_NPJ)
            .telefone(UPDATED_TELEFONE)
            .cEP(UPDATED_C_EP)
            .razaoSocial(UPDATED_RAZAO_SOCIAL)
            .nomeFantasia(UPDATED_NOME_FANTASIA)
            .tipoUnidadeSaude(UPDATED_TIPO_UNIDADE_SAUDE);

        restUnidadeSaudeMockMvc.perform(put("/api/unidade-saudes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedUnidadeSaude)))
            .andExpect(status().isOk());

        // Validate the UnidadeSaude in the database
        List<UnidadeSaude> unidadeSaudeList = unidadeSaudeRepository.findAll();
        assertThat(unidadeSaudeList).hasSize(databaseSizeBeforeUpdate);
        UnidadeSaude testUnidadeSaude = unidadeSaudeList.get(unidadeSaudeList.size() - 1);
        assertThat(testUnidadeSaude.getuUID()).isEqualTo(UPDATED_U_UID);
        assertThat(testUnidadeSaude.getEndereco()).isEqualTo(UPDATED_ENDERECO);
        assertThat(testUnidadeSaude.getcNPJ()).isEqualTo(UPDATED_C_NPJ);
        assertThat(testUnidadeSaude.getTelefone()).isEqualTo(UPDATED_TELEFONE);
        assertThat(testUnidadeSaude.getcEP()).isEqualTo(UPDATED_C_EP);
        assertThat(testUnidadeSaude.getRazaoSocial()).isEqualTo(UPDATED_RAZAO_SOCIAL);
        assertThat(testUnidadeSaude.getNomeFantasia()).isEqualTo(UPDATED_NOME_FANTASIA);
        assertThat(testUnidadeSaude.getTipoUnidadeSaude()).isEqualTo(UPDATED_TIPO_UNIDADE_SAUDE);
    }

    @Test
    @Transactional
    public void updateNonExistingUnidadeSaude() throws Exception {
        int databaseSizeBeforeUpdate = unidadeSaudeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUnidadeSaudeMockMvc.perform(put("/api/unidade-saudes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(unidadeSaude)))
            .andExpect(status().isBadRequest());

        // Validate the UnidadeSaude in the database
        List<UnidadeSaude> unidadeSaudeList = unidadeSaudeRepository.findAll();
        assertThat(unidadeSaudeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUnidadeSaude() throws Exception {
        // Initialize the database
        unidadeSaudeRepository.saveAndFlush(unidadeSaude);

        int databaseSizeBeforeDelete = unidadeSaudeRepository.findAll().size();

        // Delete the unidadeSaude
        restUnidadeSaudeMockMvc.perform(delete("/api/unidade-saudes/{id}", unidadeSaude.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UnidadeSaude> unidadeSaudeList = unidadeSaudeRepository.findAll();
        assertThat(unidadeSaudeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
