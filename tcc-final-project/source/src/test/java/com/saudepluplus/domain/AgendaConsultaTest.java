package com.saudepluplus.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.saudepluplus.web.rest.TestUtil;

public class AgendaConsultaTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AgendaConsulta.class);
        AgendaConsulta agendaConsulta1 = new AgendaConsulta();
        agendaConsulta1.setId(1L);
        AgendaConsulta agendaConsulta2 = new AgendaConsulta();
        agendaConsulta2.setId(agendaConsulta1.getId());
        assertThat(agendaConsulta1).isEqualTo(agendaConsulta2);
        agendaConsulta2.setId(2L);
        assertThat(agendaConsulta1).isNotEqualTo(agendaConsulta2);
        agendaConsulta1.setId(null);
        assertThat(agendaConsulta1).isNotEqualTo(agendaConsulta2);
    }
}
