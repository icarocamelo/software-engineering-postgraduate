package com.saudepluplus.web.rest;

import com.saudepluplus.domain.PerfilAcesso;
import com.saudepluplus.repository.PerfilAcessoRepository;
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
 * REST controller for managing {@link com.saudepluplus.domain.PerfilAcesso}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PerfilAcessoResource {

    private final Logger log = LoggerFactory.getLogger(PerfilAcessoResource.class);

    private static final String ENTITY_NAME = "perfilAcesso";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PerfilAcessoRepository perfilAcessoRepository;

    public PerfilAcessoResource(PerfilAcessoRepository perfilAcessoRepository) {
        this.perfilAcessoRepository = perfilAcessoRepository;
    }

    /**
     * {@code POST  /perfil-acessos} : Create a new perfilAcesso.
     *
     * @param perfilAcesso the perfilAcesso to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new perfilAcesso, or with status {@code 400 (Bad Request)} if the perfilAcesso has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/perfil-acessos")
    public ResponseEntity<PerfilAcesso> createPerfilAcesso(@RequestBody PerfilAcesso perfilAcesso) throws URISyntaxException {
        log.debug("REST request to save PerfilAcesso : {}", perfilAcesso);
        if (perfilAcesso.getId() != null) {
            throw new BadRequestAlertException("A new perfilAcesso cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PerfilAcesso result = perfilAcessoRepository.save(perfilAcesso);
        return ResponseEntity.created(new URI("/api/perfil-acessos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /perfil-acessos} : Updates an existing perfilAcesso.
     *
     * @param perfilAcesso the perfilAcesso to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated perfilAcesso,
     * or with status {@code 400 (Bad Request)} if the perfilAcesso is not valid,
     * or with status {@code 500 (Internal Server Error)} if the perfilAcesso couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/perfil-acessos")
    public ResponseEntity<PerfilAcesso> updatePerfilAcesso(@RequestBody PerfilAcesso perfilAcesso) throws URISyntaxException {
        log.debug("REST request to update PerfilAcesso : {}", perfilAcesso);
        if (perfilAcesso.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PerfilAcesso result = perfilAcessoRepository.save(perfilAcesso);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, perfilAcesso.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /perfil-acessos} : get all the perfilAcessos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of perfilAcessos in body.
     */
    @GetMapping("/perfil-acessos")
    public List<PerfilAcesso> getAllPerfilAcessos() {
        log.debug("REST request to get all PerfilAcessos");
        return perfilAcessoRepository.findAll();
    }

    /**
     * {@code GET  /perfil-acessos/:id} : get the "id" perfilAcesso.
     *
     * @param id the id of the perfilAcesso to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the perfilAcesso, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/perfil-acessos/{id}")
    public ResponseEntity<PerfilAcesso> getPerfilAcesso(@PathVariable Long id) {
        log.debug("REST request to get PerfilAcesso : {}", id);
        Optional<PerfilAcesso> perfilAcesso = perfilAcessoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(perfilAcesso);
    }

    /**
     * {@code DELETE  /perfil-acessos/:id} : delete the "id" perfilAcesso.
     *
     * @param id the id of the perfilAcesso to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/perfil-acessos/{id}")
    public ResponseEntity<Void> deletePerfilAcesso(@PathVariable Long id) {
        log.debug("REST request to delete PerfilAcesso : {}", id);
        perfilAcessoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
