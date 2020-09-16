package com.saudepluplus.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.saudepluplus.web.rest.TestUtil;

public class CartaoVacinaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CartaoVacina.class);
        CartaoVacina cartaoVacina1 = new CartaoVacina();
        cartaoVacina1.setId(1L);
        CartaoVacina cartaoVacina2 = new CartaoVacina();
        cartaoVacina2.setId(cartaoVacina1.getId());
        assertThat(cartaoVacina1).isEqualTo(cartaoVacina2);
        cartaoVacina2.setId(2L);
        assertThat(cartaoVacina1).isNotEqualTo(cartaoVacina2);
        cartaoVacina1.setId(null);
        assertThat(cartaoVacina1).isNotEqualTo(cartaoVacina2);
    }
}
