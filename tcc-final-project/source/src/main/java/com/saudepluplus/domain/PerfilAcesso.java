package com.saudepluplus.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A PerfilAcesso.
 */
@Entity
@Table(name = "perfil_acesso")
public class PerfilAcesso implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "u_uid")
    private String uUID;

    @ManyToOne
    @JsonIgnoreProperties(value = "perfilAcessos", allowSetters = true)
    private Permissao permissao;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getuUID() {
        return uUID;
    }

    public PerfilAcesso uUID(String uUID) {
        this.uUID = uUID;
        return this;
    }

    public void setuUID(String uUID) {
        this.uUID = uUID;
    }

    public Permissao getPermissao() {
        return permissao;
    }

    public PerfilAcesso permissao(Permissao permissao) {
        this.permissao = permissao;
        return this;
    }

    public void setPermissao(Permissao permissao) {
        this.permissao = permissao;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PerfilAcesso)) {
            return false;
        }
        return id != null && id.equals(((PerfilAcesso) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PerfilAcesso{" +
            "id=" + getId() +
            ", uUID='" + getuUID() + "'" +
            "}";
    }
}
