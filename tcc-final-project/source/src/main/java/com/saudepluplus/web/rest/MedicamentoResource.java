package com.saudepluplus.web.rest;

import com.saudepluplus.domain.Medicamento;
import com.saudepluplus.repository.MedicamentoRepository;
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
 * REST controller for managing {@link com.saudepluplus.domain.Medicamento}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class MedicamentoResource {

    private final Logger log = LoggerFactory.getLogger(MedicamentoResource.class);

    private static final String ENTITY_NAME = "medicamento";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MedicamentoRepository medicamentoRepository;

    public MedicamentoResource(MedicamentoRepository medicamentoRepository) {
        this.medicamentoRepository = medicamentoRepository;
    }

    /**
     * {@code POST  /medicamentos} : Create a new medicamento.
     *
     * @param medicamento the medicamento to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new medicamento, or with status {@code 400 (Bad Request)} if the medicamento has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/medicamentos")
    public ResponseEntity<Medicamento> createMedicamento(@RequestBody Medicamento medicamento) throws URISyntaxException {
        log.debug("REST request to save Medicamento : {}", medicamento);
        if (medicamento.getId() != null) {
            throw new BadRequestAlertException("A new medicamento cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Medicamento result = medicamentoRepository.save(medicamento);
        return ResponseEntity.created(new URI("/api/medicamentos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /medicamentos} : Updates an existing medicamento.
     *
     * @param medicamento the medicamento to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated medicamento,
     * or with status {@code 400 (Bad Request)} if the medicamento is not valid,
     * or with status {@code 500 (Internal Server Error)} if the medicamento couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/medicamentos")
    public ResponseEntity<Medicamento> updateMedicamento(@RequestBody Medicamento medicamento) throws URISyntaxException {
        log.debug("REST request to update Medicamento : {}", medicamento);
        if (medicamento.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Medicamento result = medicamentoRepository.save(medicamento);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, medicamento.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /medicamentos} : get all the medicamentos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of medicamentos in body.
     */
    @GetMapping("/medicamentos")
    public List<Medicamento> getAllMedicamentos() {
        log.debug("REST request to get all Medicamentos");
        return medicamentoRepository.findAll();
    }

    /**
     * {@code GET  /medicamentos/:id} : get the "id" medicamento.
     *
     * @param id the id of the medicamento to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the medicamento, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/medicamentos/{id}")
    public ResponseEntity<Medicamento> getMedicamento(@PathVariable Long id) {
        log.debug("REST request to get Medicamento : {}", id);
        Optional<Medicamento> medicamento = medicamentoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(medicamento);
    }

    /**
     * {@code DELETE  /medicamentos/:id} : delete the "id" medicamento.
     *
     * @param id the id of the medicamento to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/medicamentos/{id}")
    public ResponseEntity<Void> deleteMedicamento(@PathVariable Long id) {
        log.debug("REST request to delete Medicamento : {}", id);
        medicamentoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
