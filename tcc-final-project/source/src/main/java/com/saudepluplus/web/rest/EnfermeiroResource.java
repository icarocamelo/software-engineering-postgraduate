package com.saudepluplus.web.rest;

import com.saudepluplus.domain.Enfermeiro;
import com.saudepluplus.repository.EnfermeiroRepository;
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
 * REST controller for managing {@link com.saudepluplus.domain.Enfermeiro}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class EnfermeiroResource {

    private final Logger log = LoggerFactory.getLogger(EnfermeiroResource.class);

    private static final String ENTITY_NAME = "enfermeiro";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EnfermeiroRepository enfermeiroRepository;

    public EnfermeiroResource(EnfermeiroRepository enfermeiroRepository) {
        this.enfermeiroRepository = enfermeiroRepository;
    }

    /**
     * {@code POST  /enfermeiros} : Create a new enfermeiro.
     *
     * @param enfermeiro the enfermeiro to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new enfermeiro, or with status {@code 400 (Bad Request)} if the enfermeiro has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/enfermeiros")
    public ResponseEntity<Enfermeiro> createEnfermeiro(@RequestBody Enfermeiro enfermeiro) throws URISyntaxException {
        log.debug("REST request to save Enfermeiro : {}", enfermeiro);
        if (enfermeiro.getId() != null) {
            throw new BadRequestAlertException("A new enfermeiro cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Enfermeiro result = enfermeiroRepository.save(enfermeiro);
        return ResponseEntity.created(new URI("/api/enfermeiros/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /enfermeiros} : Updates an existing enfermeiro.
     *
     * @param enfermeiro the enfermeiro to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated enfermeiro,
     * or with status {@code 400 (Bad Request)} if the enfermeiro is not valid,
     * or with status {@code 500 (Internal Server Error)} if the enfermeiro couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/enfermeiros")
    public ResponseEntity<Enfermeiro> updateEnfermeiro(@RequestBody Enfermeiro enfermeiro) throws URISyntaxException {
        log.debug("REST request to update Enfermeiro : {}", enfermeiro);
        if (enfermeiro.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Enfermeiro result = enfermeiroRepository.save(enfermeiro);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, enfermeiro.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /enfermeiros} : get all the enfermeiros.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of enfermeiros in body.
     */
    @GetMapping("/enfermeiros")
    public List<Enfermeiro> getAllEnfermeiros() {
        log.debug("REST request to get all Enfermeiros");
        return enfermeiroRepository.findAll();
    }

    /**
     * {@code GET  /enfermeiros/:id} : get the "id" enfermeiro.
     *
     * @param id the id of the enfermeiro to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the enfermeiro, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/enfermeiros/{id}")
    public ResponseEntity<Enfermeiro> getEnfermeiro(@PathVariable Long id) {
        log.debug("REST request to get Enfermeiro : {}", id);
        Optional<Enfermeiro> enfermeiro = enfermeiroRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(enfermeiro);
    }

    /**
     * {@code DELETE  /enfermeiros/:id} : delete the "id" enfermeiro.
     *
     * @param id the id of the enfermeiro to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/enfermeiros/{id}")
    public ResponseEntity<Void> deleteEnfermeiro(@PathVariable Long id) {
        log.debug("REST request to delete Enfermeiro : {}", id);
        enfermeiroRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
