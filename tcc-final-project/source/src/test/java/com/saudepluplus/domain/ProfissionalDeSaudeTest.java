package com.saudepluplus.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.saudepluplus.web.rest.TestUtil;

public class ProfissionalDeSaudeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProfissionalDeSaude.class);
        ProfissionalDeSaude profissionalDeSaude1 = new ProfissionalDeSaude();
        profissionalDeSaude1.setId(1L);
        ProfissionalDeSaude profissionalDeSaude2 = new ProfissionalDeSaude();
        profissionalDeSaude2.setId(profissionalDeSaude1.getId());
        assertThat(profissionalDeSaude1).isEqualTo(profissionalDeSaude2);
        profissionalDeSaude2.setId(2L);
        assertThat(profissionalDeSaude1).isNotEqualTo(profissionalDeSaude2);
        profissionalDeSaude1.setId(null);
        assertThat(profissionalDeSaude1).isNotEqualTo(profissionalDeSaude2);
    }
}
