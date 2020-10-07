package com.saudepluplus.web.rest;

import com.saudepluplus.domain.ProfissionalDeSaude;
import com.saudepluplus.repository.ProfissionalDeSaudeRepository;
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
 * REST controller for managing {@link com.saudepluplus.domain.ProfissionalDeSaude}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProfissionalDeSaudeResource {

    private final Logger log = LoggerFactory.getLogger(ProfissionalDeSaudeResource.class);

    private static final String ENTITY_NAME = "profissionalDeSaude";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProfissionalDeSaudeRepository profissionalDeSaudeRepository;

    public ProfissionalDeSaudeResource(ProfissionalDeSaudeRepository profissionalDeSaudeRepository) {
        this.profissionalDeSaudeRepository = profissionalDeSaudeRepository;
    }

    /**
     * {@code POST  /profissional-de-saudes} : Create a new profissionalDeSaude.
     *
     * @param profissionalDeSaude the profissionalDeSaude to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new profissionalDeSaude, or with status {@code 400 (Bad Request)} if the profissionalDeSaude has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/profissional-de-saudes")
    public ResponseEntity<ProfissionalDeSaude> createProfissionalDeSaude(@RequestBody ProfissionalDeSaude profissionalDeSaude) throws URISyntaxException {
        log.debug("REST request to save ProfissionalDeSaude : {}", profissionalDeSaude);
        if (profissionalDeSaude.getId() != null) {
            throw new BadRequestAlertException("A new profissionalDeSaude cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProfissionalDeSaude result = profissionalDeSaudeRepository.save(profissionalDeSaude);
        return ResponseEntity.created(new URI("/api/profissional-de-saudes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /profissional-de-saudes} : Updates an existing profissionalDeSaude.
     *
     * @param profissionalDeSaude the profissionalDeSaude to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated profissionalDeSaude,
     * or with status {@code 400 (Bad Request)} if the profissionalDeSaude is not valid,
     * or with status {@code 500 (Internal Server Error)} if the profissionalDeSaude couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/profissional-de-saudes")
    public ResponseEntity<ProfissionalDeSaude> updateProfissionalDeSaude(@RequestBody ProfissionalDeSaude profissionalDeSaude) throws URISyntaxException {
        log.debug("REST request to update ProfissionalDeSaude : {}", profissionalDeSaude);
        if (profissionalDeSaude.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProfissionalDeSaude result = profissionalDeSaudeRepository.save(profissionalDeSaude);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, profissionalDeSaude.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /profissional-de-saudes} : get all the profissionalDeSaudes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of profissionalDeSaudes in body.
     */
    @GetMapping("/profissional-de-saudes")
    public List<ProfissionalDeSaude> getAllProfissionalDeSaudes() {
        log.debug("REST request to get all ProfissionalDeSaudes");
        return profissionalDeSaudeRepository.findAll();
    }

    /**
     * {@code GET  /profissional-de-saudes/:id} : get the "id" profissionalDeSaude.
     *
     * @param id the id of the profissionalDeSaude to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the profissionalDeSaude, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/profissional-de-saudes/{id}")
    public ResponseEntity<ProfissionalDeSaude> getProfissionalDeSaude(@PathVariable Long id) {
        log.debug("REST request to get ProfissionalDeSaude : {}", id);
        Optional<ProfissionalDeSaude> profissionalDeSaude = profissionalDeSaudeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(profissionalDeSaude);
    }

    /**
     * {@code DELETE  /profissional-de-saudes/:id} : delete the "id" profissionalDeSaude.
     *
     * @param id the id of the profissionalDeSaude to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/profissional-de-saudes/{id}")
    public ResponseEntity<Void> deleteProfissionalDeSaude(@PathVariable Long id) {
        log.debug("REST request to delete ProfissionalDeSaude : {}", id);
        profissionalDeSaudeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
