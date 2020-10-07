package com.saudepluplus.web.rest;

import com.saudepluplus.SaudepluplusApp;
import com.saudepluplus.domain.CartaoVacina;
import com.saudepluplus.repository.CartaoVacinaRepository;

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
 * Integration tests for the {@link CartaoVacinaResource} REST controller.
 */
@SpringBootTest(classes = SaudepluplusApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class CartaoVacinaResourceIT {

    @Autowired
    private CartaoVacinaRepository cartaoVacinaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCartaoVacinaMockMvc;

    private CartaoVacina cartaoVacina;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CartaoVacina createEntity(EntityManager em) {
        CartaoVacina cartaoVacina = new CartaoVacina();
        return cartaoVacina;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CartaoVacina createUpdatedEntity(EntityManager em) {
        CartaoVacina cartaoVacina = new CartaoVacina();
        return cartaoVacina;
    }

    @BeforeEach
    public void initTest() {
        cartaoVacina = createEntity(em);
    }

    @Test
    @Transactional
    public void createCartaoVacina() throws Exception {
        int databaseSizeBeforeCreate = cartaoVacinaRepository.findAll().size();
        // Create the CartaoVacina
        restCartaoVacinaMockMvc.perform(post("/api/cartao-vacinas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cartaoVacina)))
            .andExpect(status().isCreated());

        // Validate the CartaoVacina in the database
        List<CartaoVacina> cartaoVacinaList = cartaoVacinaRepository.findAll();
        assertThat(cartaoVacinaList).hasSize(databaseSizeBeforeCreate + 1);
        CartaoVacina testCartaoVacina = cartaoVacinaList.get(cartaoVacinaList.size() - 1);
    }

    @Test
    @Transactional
    public void createCartaoVacinaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cartaoVacinaRepository.findAll().size();

        // Create the CartaoVacina with an existing ID
        cartaoVacina.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCartaoVacinaMockMvc.perform(post("/api/cartao-vacinas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cartaoVacina)))
            .andExpect(status().isBadRequest());

        // Validate the CartaoVacina in the database
        List<CartaoVacina> cartaoVacinaList = cartaoVacinaRepository.findAll();
        assertThat(cartaoVacinaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCartaoVacinas() throws Exception {
        // Initialize the database
        cartaoVacinaRepository.saveAndFlush(cartaoVacina);

        // Get all the cartaoVacinaList
        restCartaoVacinaMockMvc.perform(get("/api/cartao-vacinas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(cartaoVacina.getId().intValue())));
    }
    
    @Test
    @Transactional
    public void getCartaoVacina() throws Exception {
        // Initialize the database
        cartaoVacinaRepository.saveAndFlush(cartaoVacina);

        // Get the cartaoVacina
        restCartaoVacinaMockMvc.perform(get("/api/cartao-vacinas/{id}", cartaoVacina.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(cartaoVacina.getId().intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingCartaoVacina() throws Exception {
        // Get the cartaoVacina
        restCartaoVacinaMockMvc.perform(get("/api/cartao-vacinas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCartaoVacina() throws Exception {
        // Initialize the database
        cartaoVacinaRepository.saveAndFlush(cartaoVacina);

        int databaseSizeBeforeUpdate = cartaoVacinaRepository.findAll().size();

        // Update the cartaoVacina
        CartaoVacina updatedCartaoVacina = cartaoVacinaRepository.findById(cartaoVacina.getId()).get();
        // Disconnect from session so that the updates on updatedCartaoVacina are not directly saved in db
        em.detach(updatedCartaoVacina);

        restCartaoVacinaMockMvc.perform(put("/api/cartao-vacinas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCartaoVacina)))
            .andExpect(status().isOk());

        // Validate the CartaoVacina in the database
        List<CartaoVacina> cartaoVacinaList = cartaoVacinaRepository.findAll();
        assertThat(cartaoVacinaList).hasSize(databaseSizeBeforeUpdate);
        CartaoVacina testCartaoVacina = cartaoVacinaList.get(cartaoVacinaList.size() - 1);
    }

    @Test
    @Transactional
    public void updateNonExistingCartaoVacina() throws Exception {
        int databaseSizeBeforeUpdate = cartaoVacinaRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCartaoVacinaMockMvc.perform(put("/api/cartao-vacinas").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(cartaoVacina)))
            .andExpect(status().isBadRequest());

        // Validate the CartaoVacina in the database
        List<CartaoVacina> cartaoVacinaList = cartaoVacinaRepository.findAll();
        assertThat(cartaoVacinaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCartaoVacina() throws Exception {
        // Initialize the database
        cartaoVacinaRepository.saveAndFlush(cartaoVacina);

        int databaseSizeBeforeDelete = cartaoVacinaRepository.findAll().size();

        // Delete the cartaoVacina
        restCartaoVacinaMockMvc.perform(delete("/api/cartao-vacinas/{id}", cartaoVacina.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CartaoVacina> cartaoVacinaList = cartaoVacinaRepository.findAll();
        assertThat(cartaoVacinaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
