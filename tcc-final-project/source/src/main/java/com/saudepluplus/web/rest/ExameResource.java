package com.saudepluplus.web.rest;

import com.saudepluplus.domain.Exame;
import com.saudepluplus.repository.ExameRepository;
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
 * REST controller for managing {@link com.saudepluplus.domain.Exame}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ExameResource {

    private final Logger log = LoggerFactory.getLogger(ExameResource.class);

    private static final String ENTITY_NAME = "exame";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExameRepository exameRepository;

    public ExameResource(ExameRepository exameRepository) {
        this.exameRepository = exameRepository;
    }

    /**
     * {@code POST  /exames} : Create a new exame.
     *
     * @param exame the exame to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new exame, or with status {@code 400 (Bad Request)} if the exame has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/exames")
    public ResponseEntity<Exame> createExame(@RequestBody Exame exame) throws URISyntaxException {
        log.debug("REST request to save Exame : {}", exame);
        if (exame.getId() != null) {
            throw new BadRequestAlertException("A new exame cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Exame result = exameRepository.save(exame);
        return ResponseEntity.created(new URI("/api/exames/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /exames} : Updates an existing exame.
     *
     * @param exame the exame to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated exame,
     * or with status {@code 400 (Bad Request)} if the exame is not valid,
     * or with status {@code 500 (Internal Server Error)} if the exame couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/exames")
    public ResponseEntity<Exame> updateExame(@RequestBody Exame exame) throws URISyntaxException {
        log.debug("REST request to update Exame : {}", exame);
        if (exame.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Exame result = exameRepository.save(exame);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, exame.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /exames} : get all the exames.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of exames in body.
     */
    @GetMapping("/exames")
    public List<Exame> getAllExames() {
        log.debug("REST request to get all Exames");
        return exameRepository.findAll();
    }

    /**
     * {@code GET  /exames/:id} : get the "id" exame.
     *
     * @param id the id of the exame to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the exame, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/exames/{id}")
    public ResponseEntity<Exame> getExame(@PathVariable Long id) {
        log.debug("REST request to get Exame : {}", id);
        Optional<Exame> exame = exameRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(exame);
    }

    /**
     * {@code DELETE  /exames/:id} : delete the "id" exame.
     *
     * @param id the id of the exame to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/exames/{id}")
    public ResponseEntity<Void> deleteExame(@PathVariable Long id) {
        log.debug("REST request to delete Exame : {}", id);
        exameRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
