package com.saudepluplus.repository;

import com.saudepluplus.domain.Exame;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Exame entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExameRepository extends JpaRepository<Exame, Long> {
}
