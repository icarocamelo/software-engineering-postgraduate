package com.saudepluplus.web.rest;

import com.saudepluplus.domain.Prontuario;
import com.saudepluplus.repository.ProntuarioRepository;
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
 * REST controller for managing {@link com.saudepluplus.domain.Prontuario}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProntuarioResource {

    private final Logger log = LoggerFactory.getLogger(ProntuarioResource.class);

    private static final String ENTITY_NAME = "prontuario";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProntuarioRepository prontuarioRepository;

    public ProntuarioResource(ProntuarioRepository prontuarioRepository) {
        this.prontuarioRepository = prontuarioRepository;
    }

    /**
     * {@code POST  /prontuarios} : Create a new prontuario.
     *
     * @param prontuario the prontuario to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new prontuario, or with status {@code 400 (Bad Request)} if the prontuario has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/prontuarios")
    public ResponseEntity<Prontuario> createProntuario(@RequestBody Prontuario prontuario) throws URISyntaxException {
        log.debug("REST request to save Prontuario : {}", prontuario);
        if (prontuario.getId() != null) {
            throw new BadRequestAlertException("A new prontuario cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Prontuario result = prontuarioRepository.save(prontuario);
        return ResponseEntity.created(new URI("/api/prontuarios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /prontuarios} : Updates an existing prontuario.
     *
     * @param prontuario the prontuario to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated prontuario,
     * or with status {@code 400 (Bad Request)} if the prontuario is not valid,
     * or with status {@code 500 (Internal Server Error)} if the prontuario couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/prontuarios")
    public ResponseEntity<Prontuario> updateProntuario(@RequestBody Prontuario prontuario) throws URISyntaxException {
        log.debug("REST request to update Prontuario : {}", prontuario);
        if (prontuario.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Prontuario result = prontuarioRepository.save(prontuario);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, prontuario.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /prontuarios} : get all the prontuarios.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of prontuarios in body.
     */
    @GetMapping("/prontuarios")
    public List<Prontuario> getAllProntuarios() {
        log.debug("REST request to get all Prontuarios");
        return prontuarioRepository.findAll();
    }

    /**
     * {@code GET  /prontuarios/:id} : get the "id" prontuario.
     *
     * @param id the id of the prontuario to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the prontuario, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/prontuarios/{id}")
    public ResponseEntity<Prontuario> getProntuario(@PathVariable Long id) {
        log.debug("REST request to get Prontuario : {}", id);
        Optional<Prontuario> prontuario = prontuarioRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(prontuario);
    }

    /**
     * {@code DELETE  /prontuarios/:id} : delete the "id" prontuario.
     *
     * @param id the id of the prontuario to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/prontuarios/{id}")
    public ResponseEntity<Void> deleteProntuario(@PathVariable Long id) {
        log.debug("REST request to delete Prontuario : {}", id);
        prontuarioRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
