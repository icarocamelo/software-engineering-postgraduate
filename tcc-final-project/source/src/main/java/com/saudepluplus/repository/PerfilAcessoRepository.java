package com.saudepluplus.repository;

import com.saudepluplus.domain.PerfilAcesso;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PerfilAcesso entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PerfilAcessoRepository extends JpaRepository<PerfilAcesso, Long> {
}
