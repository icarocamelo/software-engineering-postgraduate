package com.saudepluplus.repository;

import com.saudepluplus.domain.PostoDeSaude;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PostoDeSaude entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PostoDeSaudeRepository extends JpaRepository<PostoDeSaude, Long> {
}
