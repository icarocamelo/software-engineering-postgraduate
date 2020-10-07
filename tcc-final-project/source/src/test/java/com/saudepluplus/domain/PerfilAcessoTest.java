package com.saudepluplus.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.saudepluplus.web.rest.TestUtil;

public class PerfilAcessoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PerfilAcesso.class);
        PerfilAcesso perfilAcesso1 = new PerfilAcesso();
        perfilAcesso1.setId(1L);
        PerfilAcesso perfilAcesso2 = new PerfilAcesso();
        perfilAcesso2.setId(perfilAcesso1.getId());
        assertThat(perfilAcesso1).isEqualTo(perfilAcesso2);
        perfilAcesso2.setId(2L);
        assertThat(perfilAcesso1).isNotEqualTo(perfilAcesso2);
        perfilAcesso1.setId(null);
        assertThat(perfilAcesso1).isNotEqualTo(perfilAcesso2);
    }
}
