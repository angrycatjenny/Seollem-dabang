package com.web.backend.model.sns;

import com.web.backend.model.accounts.User;
import com.web.backend.model.tag.Tag;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Sns {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="sns_id")
    private Long snsId;

    @NotBlank
    @Column(name="voice", nullable=false, length=200)
    private String voice;

    @Column(name="image")
    private String image;

    @Column(name="text")
    private String text;

    @ManyToOne
    @JoinColumn(name="user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;

    @ManyToMany
    @JoinTable(
        name = "SNS_TAG",                              // 연결테이블 이름
        joinColumns = @JoinColumn(name = "sns_id"),        // Member와 매핑할 조인 컬럼 정보를 지정
        inverseJoinColumns = @JoinColumn(name = "tag_id") // Party와 매핑할 조인 컬럼 정보를 지정
    )
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<Tag> tags = new ArrayList<>();


    @Builder
    public Sns(String voice, String image, String text, User user){
        this.voice = voice;
        this.image = image;
        this.text = text;
        this.user = user;
    }
}
