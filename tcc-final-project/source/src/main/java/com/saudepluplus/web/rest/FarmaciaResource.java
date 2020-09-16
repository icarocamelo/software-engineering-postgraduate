package com.saudepluplus.web.rest;

import com.saudepluplus.domain.Farmacia;
import com.saudepluplus.repository.FarmaciaRepository;
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
 * REST controller for managing {@link com.saudepluplus.domain.Farmacia}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FarmaciaResource {

    private final Logger log = LoggerFactory.getLogger(FarmaciaResource.class);

    private static final String ENTITY_NAME = "farmacia";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FarmaciaRepository farmaciaRepository;

    public FarmaciaResource(FarmaciaRepository farmaciaRepository) {
        this.farmaciaRepository = farmaciaRepository;
    }

    /**
     * {@code POST  /farmacias} : Create a new farmacia.
     *
     * @param farmacia the farmacia to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new farmacia, or with status {@code 400 (Bad Request)} if the farmacia has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/farmacias")
    public ResponseEntity<Farmacia> createFarmacia(@RequestBody Farmacia farmacia) throws URISyntaxException {
        log.debug("REST request to save Farmacia : {}", farmacia);
        if (farmacia.getId() != null) {
            throw new BadRequestAlertException("A new farmacia cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Farmacia result = farmaciaRepository.save(farmacia);
        return ResponseEntity.created(new URI("/api/farmacias/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /farmacias} : Updates an existing farmacia.
     *
     * @param farmacia the farmacia to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated farmacia,
     * or with status {@code 400 (Bad Request)} if the farmacia is not valid,
     * or with status {@code 500 (Internal Server Error)} if the farmacia couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/farmacias")
    public ResponseEntity<Farmacia> updateFarmacia(@RequestBody Farmacia farmacia) throws URISyntaxException {
        log.debug("REST request to update Farmacia : {}", farmacia);
        if (farmacia.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Farmacia result = farmaciaRepository.save(farmacia);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, farmacia.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /farmacias} : get all the farmacias.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of farmacias in body.
     */
    @GetMapping("/farmacias")
    public List<Farmacia> getAllFarmacias() {
        log.debug("REST request to get all Farmacias");
        return farmaciaRepository.findAll();
    }

    /**
     * {@code GET  /farmacias/:id} : get the "id" farmacia.
     *
     * @param id the id of the farmacia to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the farmacia, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/farmacias/{id}")
    public ResponseEntity<Farmacia> getFarmacia(@PathVariable Long id) {
        log.debug("REST request to get Farmacia : {}", id);
        Optional<Farmacia> farmacia = farmaciaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(farmacia);
    }

    /**
     * {@code DELETE  /farmacias/:id} : delete the "id" farmacia.
     *
     * @param id the id of the farmacia to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/farmacias/{id}")
    public ResponseEntity<Void> deleteFarmacia(@PathVariable Long id) {
        log.debug("REST request to delete Farmacia : {}", id);
        farmaciaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
