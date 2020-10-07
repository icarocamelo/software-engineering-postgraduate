package com.saudepluplus.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A ProfissionalDeSaude.
 */
@Entity
@Table(name = "profissional_de_saude")
public class ProfissionalDeSaude implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToMany(mappedBy = "profissionalDeSaude")
    private Set<Prontuario> prontuarios = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Prontuario> getProntuarios() {
        return prontuarios;
    }

    public ProfissionalDeSaude prontuarios(Set<Prontuario> prontuarios) {
        this.prontuarios = prontuarios;
        return this;
    }

    public ProfissionalDeSaude addProntuario(Prontuario prontuario) {
        this.prontuarios.add(prontuario);
        prontuario.setProfissionalDeSaude(this);
        return this;
    }

    public ProfissionalDeSaude removeProntuario(Prontuario prontuario) {
        this.prontuarios.remove(prontuario);
        prontuario.setProfissionalDeSaude(null);
        return this;
    }

    public void setProntuarios(Set<Prontuario> prontuarios) {
        this.prontuarios = prontuarios;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProfissionalDeSaude)) {
            return false;
        }
        return id != null && id.equals(((ProfissionalDeSaude) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProfissionalDeSaude{" +
            "id=" + getId() +
            "}";
    }
}
