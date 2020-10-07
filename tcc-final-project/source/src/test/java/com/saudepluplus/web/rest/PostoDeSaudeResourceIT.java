package com.saudepluplus.web.rest;

import com.saudepluplus.SaudepluplusApp;
import com.saudepluplus.domain.PostoDeSaude;
import com.saudepluplus.repository.PostoDeSaudeRepository;

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
 * Integration tests for the {@link PostoDeSaudeResource} REST controller.
 */
@SpringBootTest(classes = SaudepluplusApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PostoDeSaudeResourceIT {

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
    private PostoDeSaudeRepository postoDeSaudeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPostoDeSaudeMockMvc;

    private PostoDeSaude postoDeSaude;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PostoDeSaude createEntity(EntityManager em) {
        PostoDeSaude postoDeSaude = new PostoDeSaude()
            .cNPJ(DEFAULT_C_NPJ)
            .telefone(DEFAULT_TELEFONE)
            .cEP(DEFAULT_C_EP)
            .razaoSocial(DEFAULT_RAZAO_SOCIAL)
            .nomeFantasia(DEFAULT_NOME_FANTASIA)
            .tipoUnidadeSaude(DEFAULT_TIPO_UNIDADE_SAUDE);
        return postoDeSaude;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PostoDeSaude createUpdatedEntity(EntityManager em) {
        PostoDeSaude postoDeSaude = new PostoDeSaude()
            .cNPJ(UPDATED_C_NPJ)
            .telefone(UPDATED_TELEFONE)
            .cEP(UPDATED_C_EP)
            .razaoSocial(UPDATED_RAZAO_SOCIAL)
            .nomeFantasia(UPDATED_NOME_FANTASIA)
            .tipoUnidadeSaude(UPDATED_TIPO_UNIDADE_SAUDE);
        return postoDeSaude;
    }

    @BeforeEach
    public void initTest() {
        postoDeSaude = createEntity(em);
    }

    @Test
    @Transactional
    public void createPostoDeSaude() throws Exception {
        int databaseSizeBeforeCreate = postoDeSaudeRepository.findAll().size();
        // Create the PostoDeSaude
        restPostoDeSaudeMockMvc.perform(post("/api/posto-de-saudes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(postoDeSaude)))
            .andExpect(status().isCreated());

        // Validate the PostoDeSaude in the database
        List<PostoDeSaude> postoDeSaudeList = postoDeSaudeRepository.findAll();
        assertThat(postoDeSaudeList).hasSize(databaseSizeBeforeCreate + 1);
        PostoDeSaude testPostoDeSaude = postoDeSaudeList.get(postoDeSaudeList.size() - 1);
        assertThat(testPostoDeSaude.getcNPJ()).isEqualTo(DEFAULT_C_NPJ);
        assertThat(testPostoDeSaude.getTelefone()).isEqualTo(DEFAULT_TELEFONE);
        assertThat(testPostoDeSaude.getcEP()).isEqualTo(DEFAULT_C_EP);
        assertThat(testPostoDeSaude.getRazaoSocial()).isEqualTo(DEFAULT_RAZAO_SOCIAL);
        assertThat(testPostoDeSaude.getNomeFantasia()).isEqualTo(DEFAULT_NOME_FANTASIA);
        assertThat(testPostoDeSaude.getTipoUnidadeSaude()).isEqualTo(DEFAULT_TIPO_UNIDADE_SAUDE);
    }

    @Test
    @Transactional
    public void createPostoDeSaudeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = postoDeSaudeRepository.findAll().size();

        // Create the PostoDeSaude with an existing ID
        postoDeSaude.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPostoDeSaudeMockMvc.perform(post("/api/posto-de-saudes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(postoDeSaude)))
            .andExpect(status().isBadRequest());

        // Validate the PostoDeSaude in the database
        List<PostoDeSaude> postoDeSaudeList = postoDeSaudeRepository.findAll();
        assertThat(postoDeSaudeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPostoDeSaudes() throws Exception {
        // Initialize the database
        postoDeSaudeRepository.saveAndFlush(postoDeSaude);

        // Get all the postoDeSaudeList
        restPostoDeSaudeMockMvc.perform(get("/api/posto-de-saudes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(postoDeSaude.getId().intValue())))
            .andExpect(jsonPath("$.[*].cNPJ").value(hasItem(DEFAULT_C_NPJ)))
            .andExpect(jsonPath("$.[*].telefone").value(hasItem(DEFAULT_TELEFONE)))
            .andExpect(jsonPath("$.[*].cEP").value(hasItem(DEFAULT_C_EP)))
            .andExpect(jsonPath("$.[*].razaoSocial").value(hasItem(DEFAULT_RAZAO_SOCIAL)))
            .andExpect(jsonPath("$.[*].nomeFantasia").value(hasItem(DEFAULT_NOME_FANTASIA)))
            .andExpect(jsonPath("$.[*].tipoUnidadeSaude").value(hasItem(DEFAULT_TIPO_UNIDADE_SAUDE.toString())));
    }
    
    @Test
    @Transactional
    public void getPostoDeSaude() throws Exception {
        // Initialize the database
        postoDeSaudeRepository.saveAndFlush(postoDeSaude);

        // Get the postoDeSaude
        restPostoDeSaudeMockMvc.perform(get("/api/posto-de-saudes/{id}", postoDeSaude.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(postoDeSaude.getId().intValue()))
            .andExpect(jsonPath("$.cNPJ").value(DEFAULT_C_NPJ))
            .andExpect(jsonPath("$.telefone").value(DEFAULT_TELEFONE))
            .andExpect(jsonPath("$.cEP").value(DEFAULT_C_EP))
            .andExpect(jsonPath("$.razaoSocial").value(DEFAULT_RAZAO_SOCIAL))
            .andExpect(jsonPath("$.nomeFantasia").value(DEFAULT_NOME_FANTASIA))
            .andExpect(jsonPath("$.tipoUnidadeSaude").value(DEFAULT_TIPO_UNIDADE_SAUDE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingPostoDeSaude() throws Exception {
        // Get the postoDeSaude
        restPostoDeSaudeMockMvc.perform(get("/api/posto-de-saudes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePostoDeSaude() throws Exception {
        // Initialize the database
        postoDeSaudeRepository.saveAndFlush(postoDeSaude);

        int databaseSizeBeforeUpdate = postoDeSaudeRepository.findAll().size();

        // Update the postoDeSaude
        PostoDeSaude updatedPostoDeSaude = postoDeSaudeRepository.findById(postoDeSaude.getId()).get();
        // Disconnect from session so that the updates on updatedPostoDeSaude are not directly saved in db
        em.detach(updatedPostoDeSaude);
        updatedPostoDeSaude
            .cNPJ(UPDATED_C_NPJ)
            .telefone(UPDATED_TELEFONE)
            .cEP(UPDATED_C_EP)
            .razaoSocial(UPDATED_RAZAO_SOCIAL)
            .nomeFantasia(UPDATED_NOME_FANTASIA)
            .tipoUnidadeSaude(UPDATED_TIPO_UNIDADE_SAUDE);

        restPostoDeSaudeMockMvc.perform(put("/api/posto-de-saudes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPostoDeSaude)))
            .andExpect(status().isOk());

        // Validate the PostoDeSaude in the database
        List<PostoDeSaude> postoDeSaudeList = postoDeSaudeRepository.findAll();
        assertThat(postoDeSaudeList).hasSize(databaseSizeBeforeUpdate);
        PostoDeSaude testPostoDeSaude = postoDeSaudeList.get(postoDeSaudeList.size() - 1);
        assertThat(testPostoDeSaude.getcNPJ()).isEqualTo(UPDATED_C_NPJ);
        assertThat(testPostoDeSaude.getTelefone()).isEqualTo(UPDATED_TELEFONE);
        assertThat(testPostoDeSaude.getcEP()).isEqualTo(UPDATED_C_EP);
        assertThat(testPostoDeSaude.getRazaoSocial()).isEqualTo(UPDATED_RAZAO_SOCIAL);
        assertThat(testPostoDeSaude.getNomeFantasia()).isEqualTo(UPDATED_NOME_FANTASIA);
        assertThat(testPostoDeSaude.getTipoUnidadeSaude()).isEqualTo(UPDATED_TIPO_UNIDADE_SAUDE);
    }

    @Test
    @Transactional
    public void updateNonExistingPostoDeSaude() throws Exception {
        int databaseSizeBeforeUpdate = postoDeSaudeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPostoDeSaudeMockMvc.perform(put("/api/posto-de-saudes").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(postoDeSaude)))
            .andExpect(status().isBadRequest());

        // Validate the PostoDeSaude in the database
        List<PostoDeSaude> postoDeSaudeList = postoDeSaudeRepository.findAll();
        assertThat(postoDeSaudeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePostoDeSaude() throws Exception {
        // Initialize the database
        postoDeSaudeRepository.saveAndFlush(postoDeSaude);

        int databaseSizeBeforeDelete = postoDeSaudeRepository.findAll().size();

        // Delete the postoDeSaude
        restPostoDeSaudeMockMvc.perform(delete("/api/posto-de-saudes/{id}", postoDeSaude.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PostoDeSaude> postoDeSaudeList = postoDeSaudeRepository.findAll();
        assertThat(postoDeSaudeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
