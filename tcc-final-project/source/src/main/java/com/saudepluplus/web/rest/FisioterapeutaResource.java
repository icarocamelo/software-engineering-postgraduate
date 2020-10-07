package com.saudepluplus.web.rest;

import com.saudepluplus.domain.Fisioterapeuta;
import com.saudepluplus.repository.FisioterapeutaRepository;
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
 * REST controller for managing {@link com.saudepluplus.domain.Fisioterapeuta}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FisioterapeutaResource {

    private final Logger log = LoggerFactory.getLogger(FisioterapeutaResource.class);

    private static final String ENTITY_NAME = "fisioterapeuta";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FisioterapeutaRepository fisioterapeutaRepository;

    public FisioterapeutaResource(FisioterapeutaRepository fisioterapeutaRepository) {
        this.fisioterapeutaRepository = fisioterapeutaRepository;
    }

    /**
     * {@code POST  /fisioterapeutas} : Create a new fisioterapeuta.
     *
     * @param fisioterapeuta the fisioterapeuta to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new fisioterapeuta, or with status {@code 400 (Bad Request)} if the fisioterapeuta has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/fisioterapeutas")
    public ResponseEntity<Fisioterapeuta> createFisioterapeuta(@RequestBody Fisioterapeuta fisioterapeuta) throws URISyntaxException {
        log.debug("REST request to save Fisioterapeuta : {}", fisioterapeuta);
        if (fisioterapeuta.getId() != null) {
            throw new BadRequestAlertException("A new fisioterapeuta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Fisioterapeuta result = fisioterapeutaRepository.save(fisioterapeuta);
        return ResponseEntity.created(new URI("/api/fisioterapeutas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /fisioterapeutas} : Updates an existing fisioterapeuta.
     *
     * @param fisioterapeuta the fisioterapeuta to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated fisioterapeuta,
     * or with status {@code 400 (Bad Request)} if the fisioterapeuta is not valid,
     * or with status {@code 500 (Internal Server Error)} if the fisioterapeuta couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/fisioterapeutas")
    public ResponseEntity<Fisioterapeuta> updateFisioterapeuta(@RequestBody Fisioterapeuta fisioterapeuta) throws URISyntaxException {
        log.debug("REST request to update Fisioterapeuta : {}", fisioterapeuta);
        if (fisioterapeuta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Fisioterapeuta result = fisioterapeutaRepository.save(fisioterapeuta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, fisioterapeuta.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /fisioterapeutas} : get all the fisioterapeutas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fisioterapeutas in body.
     */
    @GetMapping("/fisioterapeutas")
    public List<Fisioterapeuta> getAllFisioterapeutas() {
        log.debug("REST request to get all Fisioterapeutas");
        return fisioterapeutaRepository.findAll();
    }

    /**
     * {@code GET  /fisioterapeutas/:id} : get the "id" fisioterapeuta.
     *
     * @param id the id of the fisioterapeuta to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the fisioterapeuta, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/fisioterapeutas/{id}")
    public ResponseEntity<Fisioterapeuta> getFisioterapeuta(@PathVariable Long id) {
        log.debug("REST request to get Fisioterapeuta : {}", id);
        Optional<Fisioterapeuta> fisioterapeuta = fisioterapeutaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(fisioterapeuta);
    }

    /**
     * {@code DELETE  /fisioterapeutas/:id} : delete the "id" fisioterapeuta.
     *
     * @param id the id of the fisioterapeuta to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/fisioterapeutas/{id}")
    public ResponseEntity<Void> deleteFisioterapeuta(@PathVariable Long id) {
        log.debug("REST request to delete Fisioterapeuta : {}", id);
        fisioterapeutaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
