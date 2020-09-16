package com.saudepluplus.web.rest;

import com.saudepluplus.domain.AgendaExame;
import com.saudepluplus.repository.AgendaExameRepository;
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
 * REST controller for managing {@link com.saudepluplus.domain.AgendaExame}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AgendaExameResource {

    private final Logger log = LoggerFactory.getLogger(AgendaExameResource.class);

    private static final String ENTITY_NAME = "agendaExame";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AgendaExameRepository agendaExameRepository;

    public AgendaExameResource(AgendaExameRepository agendaExameRepository) {
        this.agendaExameRepository = agendaExameRepository;
    }

    /**
     * {@code POST  /agenda-exames} : Create a new agendaExame.
     *
     * @param agendaExame the agendaExame to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new agendaExame, or with status {@code 400 (Bad Request)} if the agendaExame has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/agenda-exames")
    public ResponseEntity<AgendaExame> createAgendaExame(@RequestBody AgendaExame agendaExame) throws URISyntaxException {
        log.debug("REST request to save AgendaExame : {}", agendaExame);
        if (agendaExame.getId() != null) {
            throw new BadRequestAlertException("A new agendaExame cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AgendaExame result = agendaExameRepository.save(agendaExame);
        return ResponseEntity.created(new URI("/api/agenda-exames/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /agenda-exames} : Updates an existing agendaExame.
     *
     * @param agendaExame the agendaExame to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated agendaExame,
     * or with status {@code 400 (Bad Request)} if the agendaExame is not valid,
     * or with status {@code 500 (Internal Server Error)} if the agendaExame couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/agenda-exames")
    public ResponseEntity<AgendaExame> updateAgendaExame(@RequestBody AgendaExame agendaExame) throws URISyntaxException {
        log.debug("REST request to update AgendaExame : {}", agendaExame);
        if (agendaExame.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AgendaExame result = agendaExameRepository.save(agendaExame);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, agendaExame.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /agenda-exames} : get all the agendaExames.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of agendaExames in body.
     */
    @GetMapping("/agenda-exames")
    public List<AgendaExame> getAllAgendaExames() {
        log.debug("REST request to get all AgendaExames");
        return agendaExameRepository.findAll();
    }

    /**
     * {@code GET  /agenda-exames/:id} : get the "id" agendaExame.
     *
     * @param id the id of the agendaExame to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the agendaExame, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/agenda-exames/{id}")
    public ResponseEntity<AgendaExame> getAgendaExame(@PathVariable Long id) {
        log.debug("REST request to get AgendaExame : {}", id);
        Optional<AgendaExame> agendaExame = agendaExameRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(agendaExame);
    }

    /**
     * {@code DELETE  /agenda-exames/:id} : delete the "id" agendaExame.
     *
     * @param id the id of the agendaExame to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/agenda-exames/{id}")
    public ResponseEntity<Void> deleteAgendaExame(@PathVariable Long id) {
        log.debug("REST request to delete AgendaExame : {}", id);
        agendaExameRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
