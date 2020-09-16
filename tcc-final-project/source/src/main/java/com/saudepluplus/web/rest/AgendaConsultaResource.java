package com.saudepluplus.web.rest;

import com.saudepluplus.domain.AgendaConsulta;
import com.saudepluplus.repository.AgendaConsultaRepository;
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
 * REST controller for managing {@link com.saudepluplus.domain.AgendaConsulta}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AgendaConsultaResource {

    private final Logger log = LoggerFactory.getLogger(AgendaConsultaResource.class);

    private static final String ENTITY_NAME = "agendaConsulta";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AgendaConsultaRepository agendaConsultaRepository;

    public AgendaConsultaResource(AgendaConsultaRepository agendaConsultaRepository) {
        this.agendaConsultaRepository = agendaConsultaRepository;
    }

    /**
     * {@code POST  /agenda-consultas} : Create a new agendaConsulta.
     *
     * @param agendaConsulta the agendaConsulta to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new agendaConsulta, or with status {@code 400 (Bad Request)} if the agendaConsulta has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/agenda-consultas")
    public ResponseEntity<AgendaConsulta> createAgendaConsulta(@RequestBody AgendaConsulta agendaConsulta) throws URISyntaxException {
        log.debug("REST request to save AgendaConsulta : {}", agendaConsulta);
        if (agendaConsulta.getId() != null) {
            throw new BadRequestAlertException("A new agendaConsulta cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AgendaConsulta result = agendaConsultaRepository.save(agendaConsulta);
        return ResponseEntity.created(new URI("/api/agenda-consultas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /agenda-consultas} : Updates an existing agendaConsulta.
     *
     * @param agendaConsulta the agendaConsulta to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated agendaConsulta,
     * or with status {@code 400 (Bad Request)} if the agendaConsulta is not valid,
     * or with status {@code 500 (Internal Server Error)} if the agendaConsulta couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/agenda-consultas")
    public ResponseEntity<AgendaConsulta> updateAgendaConsulta(@RequestBody AgendaConsulta agendaConsulta) throws URISyntaxException {
        log.debug("REST request to update AgendaConsulta : {}", agendaConsulta);
        if (agendaConsulta.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AgendaConsulta result = agendaConsultaRepository.save(agendaConsulta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, agendaConsulta.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /agenda-consultas} : get all the agendaConsultas.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of agendaConsultas in body.
     */
    @GetMapping("/agenda-consultas")
    public List<AgendaConsulta> getAllAgendaConsultas() {
        log.debug("REST request to get all AgendaConsultas");
        return agendaConsultaRepository.findAll();
    }

    /**
     * {@code GET  /agenda-consultas/:id} : get the "id" agendaConsulta.
     *
     * @param id the id of the agendaConsulta to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the agendaConsulta, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/agenda-consultas/{id}")
    public ResponseEntity<AgendaConsulta> getAgendaConsulta(@PathVariable Long id) {
        log.debug("REST request to get AgendaConsulta : {}", id);
        Optional<AgendaConsulta> agendaConsulta = agendaConsultaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(agendaConsulta);
    }

    /**
     * {@code DELETE  /agenda-consultas/:id} : delete the "id" agendaConsulta.
     *
     * @param id the id of the agendaConsulta to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/agenda-consultas/{id}")
    public ResponseEntity<Void> deleteAgendaConsulta(@PathVariable Long id) {
        log.debug("REST request to delete AgendaConsulta : {}", id);
        agendaConsultaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
