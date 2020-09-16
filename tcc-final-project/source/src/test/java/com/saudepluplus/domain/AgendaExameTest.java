package com.saudepluplus.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.saudepluplus.web.rest.TestUtil;

public class AgendaExameTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AgendaExame.class);
        AgendaExame agendaExame1 = new AgendaExame();
        agendaExame1.setId(1L);
        AgendaExame agendaExame2 = new AgendaExame();
        agendaExame2.setId(agendaExame1.getId());
        assertThat(agendaExame1).isEqualTo(agendaExame2);
        agendaExame2.setId(2L);
        assertThat(agendaExame1).isNotEqualTo(agendaExame2);
        agendaExame1.setId(null);
        assertThat(agendaExame1).isNotEqualTo(agendaExame2);
    }
}
