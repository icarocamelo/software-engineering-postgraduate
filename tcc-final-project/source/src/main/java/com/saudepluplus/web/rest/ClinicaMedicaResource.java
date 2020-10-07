package com.saudepluplus.web.rest;

import com.saudepluplus.domain.ClinicaMedica;
import com.saudepluplus.repository.ClinicaMedicaRepository;
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
 * REST controller for managing {@link com.saudepluplus.domain.ClinicaMedica}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ClinicaMedicaResource {

    private final Logger log = LoggerFactory.getLogger(ClinicaMedicaResource.class);

    private static final String ENTITY_NAME = "clinicaMedica";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ClinicaMedicaRepository clinicaMedicaRepository;

    public ClinicaMedicaResource(ClinicaMedicaRepository clinicaMedicaRepository) {
        this.clinicaMedicaRepository = clinicaMedicaRepository;
    }

    /**
     * {@code POST  /clinica-medicas} : Create a new clinicaMedica.
     *
     * @param clinicaMedica the clinicaMedica to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new clinicaMedica, or with status {@code 400 (Bad Request)} if the clinicaMedica has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/clinica-medicas")
    public ResponseEntity<ClinicaMedica> createClinicaMedica(@RequestBody ClinicaMedica clinicaMedica) throws URISyntaxException {
        log.debug("REST request to save ClinicaMedica : {}", clinicaMedica);
        if (clinicaMedica.getId() != null) {
            throw new BadRequestAlertException("A new clinicaMedica cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ClinicaMedica result = clinicaMedicaRepository.save(clinicaMedica);
        return ResponseEntity.created(new URI("/api/clinica-medicas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /clinica-medicas} : Updates an existing clinicaMedica.
     *
     * @param clinicaMedica the clinicaMedica to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated clinicaMedica,
     * or with status {@code 400 (Bad Request)} if the clinicaMedica is not valid,
     * or with status {@code 500 (Internal Server Error)} if the clinicaMedica couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/clinica-medicas")
    public ResponseEntity<ClinicaMedica> updateClinicaMedica(@RequestBody ClinicaMedica clinicaMedica) throws URISyntaxException {
        log.debug("REST request to update ClinicaMedica : {}", clinicaMedica);
        if (clinicaMedica.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ClinicaMedica result = clinicaMedicaRepository.save(clinicaMedica);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, clinicaMedica.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /clinica-medicas} : get all the clinicaMedicas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of clinicaMedicas in body.
     */
    @GetMapping("/clinica-medicas")
    public List<ClinicaMedica> getAllClinicaMedicas() {
        log.debug("REST request to get all ClinicaMedicas");
        return clinicaMedicaRepository.findAll();
    }

    /**
     * {@code GET  /clinica-medicas/:id} : get the "id" clinicaMedica.
     *
     * @param id the id of the clinicaMedica to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the clinicaMedica, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/clinica-medicas/{id}")
    public ResponseEntity<ClinicaMedica> getClinicaMedica(@PathVariable Long id) {
        log.debug("REST request to get ClinicaMedica : {}", id);
        Optional<ClinicaMedica> clinicaMedica = clinicaMedicaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(clinicaMedica);
    }

    /**
     * {@code DELETE  /clinica-medicas/:id} : delete the "id" clinicaMedica.
     *
     * @param id the id of the clinicaMedica to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/clinica-medicas/{id}")
    public ResponseEntity<Void> deleteClinicaMedica(@PathVariable Long id) {
        log.debug("REST request to delete ClinicaMedica : {}", id);
        clinicaMedicaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
