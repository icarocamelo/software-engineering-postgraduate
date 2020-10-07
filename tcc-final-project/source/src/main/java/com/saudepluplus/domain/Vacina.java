package com.saudepluplus.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Vacina.
 */
@Entity
@Table(name = "vacina")
public class Vacina implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "lote")
    private String lote;

    @Column(name = "data_aplicacao")
    private LocalDate dataAplicacao;

    @ManyToOne
    @JsonIgnoreProperties(value = "vacinas", allowSetters = true)
    private CartaoVacina cartaoVacina;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Vacina nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getLote() {
        return lote;
    }

    public Vacina lote(String lote) {
        this.lote = lote;
        return this;
    }

    public void setLote(String lote) {
        this.lote = lote;
    }

    public LocalDate getDataAplicacao() {
        return dataAplicacao;
    }

    public Vacina dataAplicacao(LocalDate dataAplicacao) {
        this.dataAplicacao = dataAplicacao;
        return this;
    }

    public void setDataAplicacao(LocalDate dataAplicacao) {
        this.dataAplicacao = dataAplicacao;
    }

    public CartaoVacina getCartaoVacina() {
        return cartaoVacina;
    }

    public Vacina cartaoVacina(CartaoVacina cartaoVacina) {
        this.cartaoVacina = cartaoVacina;
        return this;
    }

    public void setCartaoVacina(CartaoVacina cartaoVacina) {
        this.cartaoVacina = cartaoVacina;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Vacina)) {
            return false;
        }
        return id != null && id.equals(((Vacina) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Vacina{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", lote='" + getLote() + "'" +
            ", dataAplicacao='" + getDataAplicacao() + "'" +
            "}";
    }
}
