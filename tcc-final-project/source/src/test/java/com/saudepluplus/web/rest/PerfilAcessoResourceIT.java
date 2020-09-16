package com.saudepluplus.web.rest;

import com.saudepluplus.SaudepluplusApp;
import com.saudepluplus.domain.PerfilAcesso;
import com.saudepluplus.repository.PerfilAcessoRepository;

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
 * Integration tests for the {@link PerfilAcessoResource} REST controller.
 */
@SpringBootTest(classes = SaudepluplusApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PerfilAcessoResourceIT {

    private static final String DEFAULT_U_UID = "AAAAAAAAAA";
    private static final String UPDATED_U_UID = "BBBBBBBBBB";

    @Autowired
    private PerfilAcessoRepository perfilAcessoRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPerfilAcessoMockMvc;

    private PerfilAcesso perfilAcesso;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PerfilAcesso createEntity(EntityManager em) {
        PerfilAcesso perfilAcesso = new PerfilAcesso()
            .uUID(DEFAULT_U_UID);
        return perfilAcesso;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PerfilAcesso createUpdatedEntity(EntityManager em) {
        PerfilAcesso perfilAcesso = new PerfilAcesso()
            .uUID(UPDATED_U_UID);
        return perfilAcesso;
    }

    @BeforeEach
    public void initTest() {
        perfilAcesso = createEntity(em);
    }

    @Test
    @Transactional
    public void createPerfilAcesso() throws Exception {
        int databaseSizeBeforeCreate = perfilAcessoRepository.findAll().size();
        // Create the PerfilAcesso
        restPerfilAcessoMockMvc.perform(post("/api/perfil-acessos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(perfilAcesso)))
            .andExpect(status().isCreated());

        // Validate the PerfilAcesso in the database
        List<PerfilAcesso> perfilAcessoList = perfilAcessoRepository.findAll();
        assertThat(perfilAcessoList).hasSize(databaseSizeBeforeCreate + 1);
        PerfilAcesso testPerfilAcesso = perfilAcessoList.get(perfilAcessoList.size() - 1);
        assertThat(testPerfilAcesso.getuUID()).isEqualTo(DEFAULT_U_UID);
    }

    @Test
    @Transactional
    public void createPerfilAcessoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = perfilAcessoRepository.findAll().size();

        // Create the PerfilAcesso with an existing ID
        perfilAcesso.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPerfilAcessoMockMvc.perform(post("/api/perfil-acessos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(perfilAcesso)))
            .andExpect(status().isBadRequest());

        // Validate the PerfilAcesso in the database
        List<PerfilAcesso> perfilAcessoList = perfilAcessoRepository.findAll();
        assertThat(perfilAcessoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPerfilAcessos() throws Exception {
        // Initialize the database
        perfilAcessoRepository.saveAndFlush(perfilAcesso);

        // Get all the perfilAcessoList
        restPerfilAcessoMockMvc.perform(get("/api/perfil-acessos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(perfilAcesso.getId().intValue())))
            .andExpect(jsonPath("$.[*].uUID").value(hasItem(DEFAULT_U_UID)));
    }
    
    @Test
    @Transactional
    public void getPerfilAcesso() throws Exception {
        // Initialize the database
        perfilAcessoRepository.saveAndFlush(perfilAcesso);

        // Get the perfilAcesso
        restPerfilAcessoMockMvc.perform(get("/api/perfil-acessos/{id}", perfilAcesso.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(perfilAcesso.getId().intValue()))
            .andExpect(jsonPath("$.uUID").value(DEFAULT_U_UID));
    }
    @Test
    @Transactional
    public void getNonExistingPerfilAcesso() throws Exception {
        // Get the perfilAcesso
        restPerfilAcessoMockMvc.perform(get("/api/perfil-acessos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePerfilAcesso() throws Exception {
        // Initialize the database
        perfilAcessoRepository.saveAndFlush(perfilAcesso);

        int databaseSizeBeforeUpdate = perfilAcessoRepository.findAll().size();

        // Update the perfilAcesso
        PerfilAcesso updatedPerfilAcesso = perfilAcessoRepository.findById(perfilAcesso.getId()).get();
        // Disconnect from session so that the updates on updatedPerfilAcesso are not directly saved in db
        em.detach(updatedPerfilAcesso);
        updatedPerfilAcesso
            .uUID(UPDATED_U_UID);

        restPerfilAcessoMockMvc.perform(put("/api/perfil-acessos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPerfilAcesso)))
            .andExpect(status().isOk());

        // Validate the PerfilAcesso in the database
        List<PerfilAcesso> perfilAcessoList = perfilAcessoRepository.findAll();
        assertThat(perfilAcessoList).hasSize(databaseSizeBeforeUpdate);
        PerfilAcesso testPerfilAcesso = perfilAcessoList.get(perfilAcessoList.size() - 1);
        assertThat(testPerfilAcesso.getuUID()).isEqualTo(UPDATED_U_UID);
    }

    @Test
    @Transactional
    public void updateNonExistingPerfilAcesso() throws Exception {
        int databaseSizeBeforeUpdate = perfilAcessoRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPerfilAcessoMockMvc.perform(put("/api/perfil-acessos").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(perfilAcesso)))
            .andExpect(status().isBadRequest());

        // Validate the PerfilAcesso in the database
        List<PerfilAcesso> perfilAcessoList = perfilAcessoRepository.findAll();
        assertThat(perfilAcessoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePerfilAcesso() throws Exception {
        // Initialize the database
        perfilAcessoRepository.saveAndFlush(perfilAcesso);

        int databaseSizeBeforeDelete = perfilAcessoRepository.findAll().size();

        // Delete the perfilAcesso
        restPerfilAcessoMockMvc.perform(delete("/api/perfil-acessos/{id}", perfilAcesso.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PerfilAcesso> perfilAcessoList = perfilAcessoRepository.findAll();
        assertThat(perfilAcessoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
