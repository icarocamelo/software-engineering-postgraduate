package com.saudepluplus.web.rest;

import com.saudepluplus.domain.Laboratorio;
import com.saudepluplus.repository.LaboratorioRepository;
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
 * REST controller for managing {@link com.saudepluplus.domain.Laboratorio}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class LaboratorioResource {

    private final Logger log = LoggerFactory.getLogger(LaboratorioResource.class);

    private static final String ENTITY_NAME = "laboratorio";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LaboratorioRepository laboratorioRepository;

    public LaboratorioResource(LaboratorioRepository laboratorioRepository) {
        this.laboratorioRepository = laboratorioRepository;
    }

    /**
     * {@code POST  /laboratorios} : Create a new laboratorio.
     *
     * @param laboratorio the laboratorio to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new laboratorio, or with status {@code 400 (Bad Request)} if the laboratorio has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/laboratorios")
    public ResponseEntity<Laboratorio> createLaboratorio(@RequestBody Laboratorio laboratorio) throws URISyntaxException {
        log.debug("REST request to save Laboratorio : {}", laboratorio);
        if (laboratorio.getId() != null) {
            throw new BadRequestAlertException("A new laboratorio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Laboratorio result = laboratorioRepository.save(laboratorio);
        return ResponseEntity.created(new URI("/api/laboratorios/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /laboratorios} : Updates an existing laboratorio.
     *
     * @param laboratorio the laboratorio to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated laboratorio,
     * or with status {@code 400 (Bad Request)} if the laboratorio is not valid,
     * or with status {@code 500 (Internal Server Error)} if the laboratorio couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/laboratorios")
    public ResponseEntity<Laboratorio> updateLaboratorio(@RequestBody Laboratorio laboratorio) throws URISyntaxException {
        log.debug("REST request to update Laboratorio : {}", laboratorio);
        if (laboratorio.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Laboratorio result = laboratorioRepository.save(laboratorio);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, laboratorio.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /laboratorios} : get all the laboratorios.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of laboratorios in body.
     */
    @GetMapping("/laboratorios")
    public List<Laboratorio> getAllLaboratorios() {
        log.debug("REST request to get all Laboratorios");
        return laboratorioRepository.findAll();
    }

    /**
     * {@code GET  /laboratorios/:id} : get the "id" laboratorio.
     *
     * @param id the id of the laboratorio to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the laboratorio, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/laboratorios/{id}")
    public ResponseEntity<Laboratorio> getLaboratorio(@PathVariable Long id) {
        log.debug("REST request to get Laboratorio : {}", id);
        Optional<Laboratorio> laboratorio = laboratorioRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(laboratorio);
    }

    /**
     * {@code DELETE  /laboratorios/:id} : delete the "id" laboratorio.
     *
     * @param id the id of the laboratorio to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/laboratorios/{id}")
    public ResponseEntity<Void> deleteLaboratorio(@PathVariable Long id) {
        log.debug("REST request to delete Laboratorio : {}", id);
        laboratorioRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
