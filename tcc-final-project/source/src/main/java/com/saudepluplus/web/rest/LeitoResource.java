package com.saudepluplus.web.rest;

import com.saudepluplus.domain.Leito;
import com.saudepluplus.repository.LeitoRepository;
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
 * REST controller for managing {@link com.saudepluplus.domain.Leito}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LeitoResource {

    private final Logger log = LoggerFactory.getLogger(LeitoResource.class);

    private static final String ENTITY_NAME = "leito";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LeitoRepository leitoRepository;

    public LeitoResource(LeitoRepository leitoRepository) {
        this.leitoRepository = leitoRepository;
    }

    /**
     * {@code POST  /leitos} : Create a new leito.
     *
     * @param leito the leito to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new leito, or with status {@code 400 (Bad Request)} if the leito has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/leitos")
    public ResponseEntity<Leito> createLeito(@RequestBody Leito leito) throws URISyntaxException {
        log.debug("REST request to save Leito : {}", leito);
        if (leito.getId() != null) {
            throw new BadRequestAlertException("A new leito cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Leito result = leitoRepository.save(leito);
        return ResponseEntity.created(new URI("/api/leitos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /leitos} : Updates an existing leito.
     *
     * @param leito the leito to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated leito,
     * or with status {@code 400 (Bad Request)} if the leito is not valid,
     * or with status {@code 500 (Internal Server Error)} if the leito couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/leitos")
    public ResponseEntity<Leito> updateLeito(@RequestBody Leito leito) throws URISyntaxException {
        log.debug("REST request to update Leito : {}", leito);
        if (leito.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Leito result = leitoRepository.save(leito);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, leito.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /leitos} : get all the leitos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of leitos in body.
     */
    @GetMapping("/leitos")
    public List<Leito> getAllLeitos() {
        log.debug("REST request to get all Leitos");
        return leitoRepository.findAll();
    }

    /**
     * {@code GET  /leitos/:id} : get the "id" leito.
     *
     * @param id the id of the leito to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the leito, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/leitos/{id}")
    public ResponseEntity<Leito> getLeito(@PathVariable Long id) {
        log.debug("REST request to get Leito : {}", id);
        Optional<Leito> leito = leitoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(leito);
    }

    /**
     * {@code DELETE  /leitos/:id} : delete the "id" leito.
     *
     * @param id the id of the leito to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/leitos/{id}")
    public ResponseEntity<Void> deleteLeito(@PathVariable Long id) {
        log.debug("REST request to delete Leito : {}", id);
        leitoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
