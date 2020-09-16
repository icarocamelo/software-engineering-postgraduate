package com.saudepluplus.web.rest;

import com.saudepluplus.domain.UnidadeSaude;
import com.saudepluplus.repository.UnidadeSaudeRepository;
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
 * REST controller for managing {@link com.saudepluplus.domain.UnidadeSaude}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UnidadeSaudeResource {

    private final Logger log = LoggerFactory.getLogger(UnidadeSaudeResource.class);

    private static final String ENTITY_NAME = "unidadeSaude";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UnidadeSaudeRepository unidadeSaudeRepository;

    public UnidadeSaudeResource(UnidadeSaudeRepository unidadeSaudeRepository) {
        this.unidadeSaudeRepository = unidadeSaudeRepository;
    }

    /**
     * {@code POST  /unidade-saudes} : Create a new unidadeSaude.
     *
     * @param unidadeSaude the unidadeSaude to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new unidadeSaude, or with status {@code 400 (Bad Request)} if the unidadeSaude has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/unidade-saudes")
    public ResponseEntity<UnidadeSaude> createUnidadeSaude(@RequestBody UnidadeSaude unidadeSaude) throws URISyntaxException {
        log.debug("REST request to save UnidadeSaude : {}", unidadeSaude);
        if (unidadeSaude.getId() != null) {
            throw new BadRequestAlertException("A new unidadeSaude cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UnidadeSaude result = unidadeSaudeRepository.save(unidadeSaude);
        return ResponseEntity.created(new URI("/api/unidade-saudes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /unidade-saudes} : Updates an existing unidadeSaude.
     *
     * @param unidadeSaude the unidadeSaude to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated unidadeSaude,
     * or with status {@code 400 (Bad Request)} if the unidadeSaude is not valid,
     * or with status {@code 500 (Internal Server Error)} if the unidadeSaude couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/unidade-saudes")
    public ResponseEntity<UnidadeSaude> updateUnidadeSaude(@RequestBody UnidadeSaude unidadeSaude) throws URISyntaxException {
        log.debug("REST request to update UnidadeSaude : {}", unidadeSaude);
        if (unidadeSaude.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UnidadeSaude result = unidadeSaudeRepository.save(unidadeSaude);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, unidadeSaude.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /unidade-saudes} : get all the unidadeSaudes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of unidadeSaudes in body.
     */
    @GetMapping("/unidade-saudes")
    public List<UnidadeSaude> getAllUnidadeSaudes() {
        log.debug("REST request to get all UnidadeSaudes");
        return unidadeSaudeRepository.findAll();
    }

    /**
     * {@code GET  /unidade-saudes/:id} : get the "id" unidadeSaude.
     *
     * @param id the id of the unidadeSaude to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the unidadeSaude, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/unidade-saudes/{id}")
    public ResponseEntity<UnidadeSaude> getUnidadeSaude(@PathVariable Long id) {
        log.debug("REST request to get UnidadeSaude : {}", id);
        Optional<UnidadeSaude> unidadeSaude = unidadeSaudeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(unidadeSaude);
    }

    /**
     * {@code DELETE  /unidade-saudes/:id} : delete the "id" unidadeSaude.
     *
     * @param id the id of the unidadeSaude to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/unidade-saudes/{id}")
    public ResponseEntity<Void> deleteUnidadeSaude(@PathVariable Long id) {
        log.debug("REST request to delete UnidadeSaude : {}", id);
        unidadeSaudeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
