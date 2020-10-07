package com.saudepluplus.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.saudepluplus.web.rest.TestUtil;

public class PermissaoTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Permissao.class);
        Permissao permissao1 = new Permissao();
        permissao1.setId(1L);
        Permissao permissao2 = new Permissao();
        permissao2.setId(permissao1.getId());
        assertThat(permissao1).isEqualTo(permissao2);
        permissao2.setId(2L);
        assertThat(permissao1).isNotEqualTo(permissao2);
        permissao1.setId(null);
        assertThat(permissao1).isNotEqualTo(permissao2);
    }
}
