package com.saudepluplus.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.saudepluplus.web.rest.TestUtil;

public class UnidadeSaudeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UnidadeSaude.class);
        UnidadeSaude unidadeSaude1 = new UnidadeSaude();
        unidadeSaude1.setId(1L);
        UnidadeSaude unidadeSaude2 = new UnidadeSaude();
        unidadeSaude2.setId(unidadeSaude1.getId());
        assertThat(unidadeSaude1).isEqualTo(unidadeSaude2);
        unidadeSaude2.setId(2L);
        assertThat(unidadeSaude1).isNotEqualTo(unidadeSaude2);
        unidadeSaude1.setId(null);
        assertThat(unidadeSaude1).isNotEqualTo(unidadeSaude2);
    }
}
