package com.saudepluplus.web.rest;

import com.saudepluplus.domain.CartaoVacina;
import com.saudepluplus.repository.CartaoVacinaRepository;
import com.saudepluplus.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.saudepluplus.domain.CartaoVacina}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CartaoVacinaResource {

    private final Logger log = LoggerFactory.getLogger(CartaoVacinaResource.class);

    private static final String ENTITY_NAME = "cartaoVacina";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CartaoVacinaRepository cartaoVacinaRepository;

    public CartaoVacinaResource(CartaoVacinaRepository cartaoVacinaRepository) {
        this.cartaoVacinaRepository = cartaoVacinaRepository;
    }

    /**
     * {@code POST  /cartao-vacinas} : Create a new cartaoVacina.
     *
     * @param cartaoVacina the cartaoVacina to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cartaoVacina, or with status {@code 400 (Bad Request)} if the cartaoVacina has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/cartao-vacinas")
    public ResponseEntity<CartaoVacina> createCartaoVacina(@RequestBody CartaoVacina cartaoVacina) throws URISyntaxException {
        log.debug("REST request to save CartaoVacina : {}", cartaoVacina);
        if (cartaoVacina.getId() != null) {
            throw new BadRequestAlertException("A new cartaoVacina cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CartaoVacina result = cartaoVacinaRepository.save(cartaoVacina);
        return ResponseEntity.created(new URI("/api/cartao-vacinas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /cartao-vacinas} : Updates an existing cartaoVacina.
     *
     * @param cartaoVacina the cartaoVacina to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cartaoVacina,
     * or with status {@code 400 (Bad Request)} if the cartaoVacina is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cartaoVacina couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cartao-vacinas")
    public ResponseEntity<CartaoVacina> updateCartaoVacina(@RequestBody CartaoVacina cartaoVacina) throws URISyntaxException {
        log.debug("REST request to update CartaoVacina : {}", cartaoVacina);
        if (cartaoVacina.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CartaoVacina result = cartaoVacinaRepository.save(cartaoVacina);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, cartaoVacina.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cartao-vacinas} : get all the cartaoVacinas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cartaoVacinas in body.
     */
    @GetMapping("/cartao-vacinas")
    public List<CartaoVacina> getAllCartaoVacinas() {
        log.debug("REST request to get all CartaoVacinas");
        return cartaoVacinaRepository.findAll();
    }

    /**
     * {@code GET  /cartao-vacinas/:id} : get the "id" cartaoVacina.
     *
     * @param id the id of the cartaoVacina to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cartaoVacina, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cartao-vacinas/{id}")
    public ResponseEntity<CartaoVacina> getCartaoVacina(@PathVariable Long id) {
        log.debug("REST request to get CartaoVacina : {}", id);
        Optional<CartaoVacina> cartaoVacina = cartaoVacinaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(cartaoVacina);
    }

    /**
     * {@code DELETE  /cartao-vacinas/:id} : delete the "id" cartaoVacina.
     *
     * @param id the id of the cartaoVacina to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/cartao-vacinas/{id}")
    public ResponseEntity<Void> deleteCartaoVacina(@PathVariable Long id) {
        log.debug("REST request to delete CartaoVacina : {}", id);
        cartaoVacinaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
