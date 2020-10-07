package com.saudepluplus.web.rest;

import com.saudepluplus.domain.Psicologo;
import com.saudepluplus.repository.PsicologoRepository;
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
 * REST controller for managing {@link com.saudepluplus.domain.Psicologo}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PsicologoResource {

    private final Logger log = LoggerFactory.getLogger(PsicologoResource.class);

    private static final String ENTITY_NAME = "psicologo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PsicologoRepository psicologoRepository;

    public PsicologoResource(PsicologoRepository psicologoRepository) {
        this.psicologoRepository = psicologoRepository;
    }

    /**
     * {@code POST  /psicologos} : Create a new psicologo.
     *
     * @param psicologo the psicologo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new psicologo, or with status {@code 400 (Bad Request)} if the psicologo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/psicologos")
    public ResponseEntity<Psicologo> createPsicologo(@RequestBody Psicologo psicologo) throws URISyntaxException {
        log.debug("REST request to save Psicologo : {}", psicologo);
        if (psicologo.getId() != null) {
            throw new BadRequestAlertException("A new psicologo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Psicologo result = psicologoRepository.save(psicologo);
        return ResponseEntity.created(new URI("/api/psicologos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /psicologos} : Updates an existing psicologo.
     *
     * @param psicologo the psicologo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated psicologo,
     * or with status {@code 400 (Bad Request)} if the psicologo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the psicologo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/psicologos")
    public ResponseEntity<Psicologo> updatePsicologo(@RequestBody Psicologo psicologo) throws URISyntaxException {
        log.debug("REST request to update Psicologo : {}", psicologo);
        if (psicologo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Psicologo result = psicologoRepository.save(psicologo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, psicologo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /psicologos} : get all the psicologos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of psicologos in body.
     */
    @GetMapping("/psicologos")
    public List<Psicologo> getAllPsicologos() {
        log.debug("REST request to get all Psicologos");
        return psicologoRepository.findAll();
    }

    /**
     * {@code GET  /psicologos/:id} : get the "id" psicologo.
     *
     * @param id the id of the psicologo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the psicologo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/psicologos/{id}")
    public ResponseEntity<Psicologo> getPsicologo(@PathVariable Long id) {
        log.debug("REST request to get Psicologo : {}", id);
        Optional<Psicologo> psicologo = psicologoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(psicologo);
    }

    /**
     * {@code DELETE  /psicologos/:id} : delete the "id" psicologo.
     *
     * @param id the id of the psicologo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/psicologos/{id}")
    public ResponseEntity<Void> deletePsicologo(@PathVariable Long id) {
        log.debug("REST request to delete Psicologo : {}", id);
        psicologoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
