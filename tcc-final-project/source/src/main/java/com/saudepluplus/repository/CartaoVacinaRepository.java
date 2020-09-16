package com.saudepluplus.repository;

import com.saudepluplus.domain.CartaoVacina;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CartaoVacina entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CartaoVacinaRepository extends JpaRepository<CartaoVacina, Long> {
}
